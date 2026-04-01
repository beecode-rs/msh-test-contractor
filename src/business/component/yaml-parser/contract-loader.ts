import { YamlParserContract } from './contract-parser.js'
import { dirname, resolve } from 'node:path'

import type { YamlContractModel, YamlContractTerm } from '#src/business/model/yaml-contract-model.js'
import { mocker } from '#src/mocker/mocker.js'
import type { AnyContract, ContractFunction, ContractTerm } from '#src/types/index.js'

export class YamlParserContractLoader {
	protected readonly _yamlParserContract = new YamlParserContract()

	async load(params: { path: string }): Promise<AnyContract> {
		const { path } = params
		const definition = await this._yamlParserContract.parseFile({ path })

		return this.createFromDefinition({ definition, modulePath: path })
	}

	async createFromDefinition(params: {
		definition: YamlContractModel
		modulePath: string
		loadedPaths?: Set<string>
	}): Promise<AnyContract> {
		const { definition, modulePath } = params
		const loadedPaths = params.loadedPaths ?? new Set<string>()

		loadedPaths.add(resolve(modulePath))

		const resolvedModule = await this._resolveModule({ moduleSpecifier: definition.module })

		const fns = this._transformFns({ fns: definition.fns })

		const contract: AnyContract = {
			fns,
			module: resolvedModule,
			subjectName: definition.subjectName,
		}

		if (definition.mock?.length) {
			const mockContracts = await this._loadMockContracts({
				loadedPaths,
				mockPaths: definition.mock,
				modulePath,
			})

			contract.mock = () => {
				return mockContracts.map((ref) => {
					const { mockRestore } = mocker.contract(ref)

					return mockRestore
				})
			}
		}

		return contract
	}

	protected async _loadMockContracts(params: {
		mockPaths: string[]
		modulePath: string
		loadedPaths: Set<string>
	}): Promise<AnyContract[]> {
		return params.mockPaths.reduce(
			async (accPromise, mockPath) => {
				const acc = await accPromise
				const absoluteMockPath = resolve(dirname(params.modulePath), mockPath)

				if (params.loadedPaths.has(absoluteMockPath)) {
					throw new Error(`Circular mock reference detected: ${absoluteMockPath}`)
				}

				params.loadedPaths.add(absoluteMockPath)

				let definition: YamlContractModel
				try {
					definition = await this._yamlParserContract.parseFile({ path: absoluteMockPath })
				} catch (error) {
					const message = this._getErrorMessage({ error })
					throw new Error(`Failed to load mock contract "${mockPath}": ${message}`)
				}

				const { mock: _, ...definitionWithoutMocks } = definition
				const contract = await this.createFromDefinition({
					definition: definitionWithoutMocks,
					loadedPaths: params.loadedPaths,
					modulePath: absoluteMockPath,
				})

				return [...acc, contract]
			},
			Promise.resolve([] as AnyContract[])
		)
	}

	protected async _resolveModule(params: { moduleSpecifier: string }): Promise<unknown> {
		try {
			return await import(params.moduleSpecifier)
		} catch (error) {
			const message = this._getErrorMessage({ error })
			throw new Error(`Failed to resolve module "${params.moduleSpecifier}": ${message}`)
		}
	}

	protected _getErrorMessage(params: { error: unknown }): string {
		if (params.error instanceof Error) {
			return params.error.message
		}

		return String(params.error)
	}

	protected _transformFns(params: { fns: Record<string, { terms: YamlContractTerm[] }> }): Record<string, ContractFunction> {
		return Object.fromEntries(
			Object.entries(params.fns).map(([fnName, fn]) => [fnName, { terms: this._transformTerms({ terms: fn.terms }) }])
		)
	}

	protected _transformTerms(params: { terms: YamlContractTerm[] }): ContractTerm[] {
		return params.terms.map((term) => this._transformTerm({ term }))
	}

	protected _transformTerm(params: { term: YamlContractTerm }): ContractTerm {
		const { term } = params
		const transformed: ContractTerm = {
			params: term.params ?? [],
			result: this._resolveResult({ term }),
		}

		if (term.constructorParams !== undefined) {
			transformed.constructorParams = term.constructorParams
		}

		if (term.returnFnParams !== undefined) {
			transformed.returnFnParams = term.returnFnParams
		}

		return transformed
	}

	protected _resolveResult(params: { term: YamlContractTerm }): unknown {
		const { term } = params

		if (term.error !== undefined) {
			return this._errorToResult({ error: term.error })
		}

		return term.result
	}

	protected _errorToResult(params: { error: unknown }): Error {
		const { error } = params

		if (error instanceof Error) {
			return error
		}

		if (typeof error === 'string') {
			return new Error(error)
		}

		if (typeof error === 'object' && error !== null && 'message' in error) {
			const errorObj = error as { message: string; name?: string }
			const result = new Error(errorObj.message)
			if (errorObj.name !== undefined) {
				result.name = errorObj.name
			}

			return result
		}

		return new Error(String(error))
	}
}
