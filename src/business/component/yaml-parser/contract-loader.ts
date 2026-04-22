import { YamlParserContract } from './contract-parser.js'
import { dirname, resolve } from 'node:path'

import type { YamlContractModel, YamlContractTerm } from '#src/business/model/yaml-contract-model.js'
import { mocker } from '#src/mocker/mocker.js'
import type { AnyContract, ContractFunction, ContractMock, ContractTerm } from '#src/types/index.js'

export class YamlParserContractLoader {
	protected readonly _yamlParserContract = new YamlParserContract()

	async load(params: { path: string }): Promise<AnyContract> {
		const { path } = params
		const definition = await this._yamlParserContract.parseFile({ path })
		await this._resolveImportPlaceholders({ basePath: dirname(path), definition })

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

		const resolvedModule = await this._resolveModule({ modulePath, moduleSpecifier: definition.module })

		const fns = this._transformFns({ fns: definition.fns })

		const contract: AnyContract = {
			fns,
			module: resolvedModule,
			subjectName: definition.subjectName,
		}

		if (definition.mock?.length) {
			const contractMockPaths = definition.mock.filter((p) => !p.startsWith('__import__:'))
			const importMockPaths = definition.mock.filter((p) => p.startsWith('__import__:'))

			let mockContracts: AnyContract[] = []
			if (contractMockPaths.length) {
				mockContracts = await this._loadMockContracts({ loadedPaths, mockPaths: contractMockPaths, modulePath })
			}

			let importMocks: ContractMock[] = []
			if (importMockPaths.length) {
				importMocks = await this._loadImportMocks({ importPaths: importMockPaths, modulePath })
			}

			contract.mock = (options) => {
				const reverts: (() => void)[] = []

				mockContracts.forEach((ref) => {
					const { mockRestore } = mocker.contract(ref)
					reverts.push(mockRestore)
				})

				importMocks.forEach((mockFn) => {
					reverts.push(...mockFn(options))
				})

				return reverts
			}
		}

		await this._attachPerFunctionMocks({ contract, definition, loadedPaths, modulePath })
		this._attachMockFunctionMocks({ contract, definition })

		return contract
	}

	protected async _attachPerFunctionMocks(params: {
		contract: AnyContract
		definition: YamlContractModel
		loadedPaths: Set<string>
		modulePath: string
	}): Promise<void> {
		const { contract, definition, loadedPaths, modulePath } = params

		const entriesWithMocks = Object.entries(definition.fns).filter(([, fnDef]) => fnDef.mock?.length)

		await Promise.all(
			entriesWithMocks.map(async ([fnName, fnDef]) => {
				const existingMock = contract.fns[fnName]?.mock
				const contractMockPaths = fnDef.mock!.filter((p) => !p.startsWith('__import__:'))
				const importMockPaths = fnDef.mock!.filter((p) => p.startsWith('__import__:'))

				let mockContracts: AnyContract[] = []
				if (contractMockPaths.length) {
					mockContracts = await this._loadMockContracts({
						loadedPaths: new Set(loadedPaths),
						mockPaths: contractMockPaths,
						modulePath,
					})
				}

				let importMocks: ContractMock[] = []
				if (importMockPaths.length) {
					importMocks = await this._loadImportMocks({ importPaths: importMockPaths, modulePath })
				}

				contract.fns[fnName]!.mock = () => {
					const restores: (() => void)[] = []

					if (existingMock) {
						restores.push(...existingMock())
					}

					mockContracts.forEach((ref) => {
						const { mockRestore } = mocker.contract(ref)
						restores.push(mockRestore)
					})

					importMocks.forEach((mockFn) => {
						restores.push(...mockFn())
					})

					return restores
				}
			})
		)
	}

	protected _attachMockFunctionMocks(params: { contract: AnyContract; definition: YamlContractModel }): void {
		const { contract, definition } = params

		Object.entries(definition.fns)
			.filter(([, fnDef]) => fnDef.mockFunction?.length)
			.forEach(([fnName, fnDef]) => {
				fnDef.mockFunction!.forEach((mockFnName) => {
					if (mockFnName === fnName) {
						throw new Error(`Function "${fnName}" cannot mock itself via mockFunction`)
					}
				})

				const existingMock = contract.fns[fnName]?.mock
				const mockFnNames = fnDef.mockFunction!

				contract.fns[fnName]!.mock = () => {
					const restores: (() => void)[] = []

					if (existingMock) {
						restores.push(...existingMock())
					}

					mockFnNames.forEach((mockFnName) => {
						const { mockRestore } = mocker.function(contract, mockFnName)
						restores.push(mockRestore)
					})

					return restores
				}
			})
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

				Object.entries(definitionWithoutMocks.fns).forEach(([fnName, fnDef]) => {
					const { mock: __, mockFunction: ___, ...fnWithoutMocks } = fnDef
					definitionWithoutMocks.fns[fnName] = fnWithoutMocks
				})

				await this._resolveImportPlaceholders({
					basePath: dirname(absoluteMockPath),
					definition: definitionWithoutMocks,
				})

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

	protected async _loadImportMocks(params: { importPaths: string[]; modulePath: string }): Promise<ContractMock[]> {
		return params.importPaths.reduce(
			async (accPromise, importPath) => {
				const acc = await accPromise
				const match = /^__import__:(.+)$/.exec(importPath)
				if (!match) {
					throw new Error(`Invalid import mock path: "${importPath}"`)
				}

				const relativePath = match[1]!
				const absolutePath = resolve(dirname(params.modulePath), relativePath)
				const mod = await import(absolutePath)

				if (typeof mod.default !== 'function') {
					throw new Error(`Import mock module "${importPath}" must export a default function`)
				}

				return [...acc, mod.default as ContractMock]
			},
			Promise.resolve([] as ContractMock[])
		)
	}

	protected async _resolveModule(params: { moduleSpecifier: string; modulePath?: string }): Promise<unknown> {
		if (params.moduleSpecifier === 'global') {
			return globalThis
		}

		let specifier = params.moduleSpecifier

		if (params.modulePath && (specifier.startsWith('./') || specifier.startsWith('../'))) {
			specifier = resolve(dirname(params.modulePath), specifier)
		}

		try {
			return await import(specifier)
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

	protected async _resolveImportPlaceholders(params: { definition: YamlContractModel; basePath: string }): Promise<void> {
		const { definition, basePath } = params

		await Promise.all(
			Object.values(definition.fns).map(async (fn) => {
				await Promise.all(
					fn.terms.map(async (term) => {
						if (term.params) {
							term.params = (await this._resolveValueDeep({ basePath, value: term.params })) as unknown[]
						}
						if (term.result !== undefined) {
							term.result = await this._resolveValueDeep({ basePath, value: term.result })
						}
						if (term.constructorParams) {
							term.constructorParams = (await this._resolveValueDeep({
								basePath,
								value: term.constructorParams,
							})) as unknown[]
						}
						if (term.returnFnParams) {
							term.returnFnParams = (await this._resolveValueDeep({
								basePath,
								value: term.returnFnParams,
							})) as unknown[]
						}
					})
				)
			})
		)
	}

	protected async _resolveValueDeep(params: { value: unknown; basePath: string }): Promise<unknown> {
		const { value, basePath } = params

		if (this._isImportPlaceholder(value)) {
			return this._resolveImport({ basePath, placeholder: value })
		}

		if (Array.isArray(value)) {
			return Promise.all(value.map((item) => this._resolveValueDeep({ basePath, value: item })))
		}

		if (value !== null && typeof value === 'object' && this._isPlainObject(value)) {
			const entries = await Promise.all(
				Object.entries(value as Record<string, unknown>).map(async ([key, val]) => [
					key,
					await this._resolveValueDeep({ basePath, value: val }),
				])
			)

			return Object.fromEntries(entries)
		}

		return value
	}

	protected _isPlainObject(value: object): boolean {
		const proto = Object.getPrototypeOf(value)

		return proto === Object.prototype || proto === null
	}

	protected _isImportPlaceholder(value: unknown): value is { __yaml_import__: { path: string; property: string } } {
		return (
			value !== null &&
			typeof value === 'object' &&
			'__yaml_import__' in value &&
			typeof (value as Record<string, unknown>).__yaml_import__ === 'object'
		)
	}

	protected async _resolveImport(params: {
		placeholder: { __yaml_import__: { path: string; property: string } }
		basePath: string
	}): Promise<unknown> {
		const { placeholder, basePath } = params
		const { path, property } = placeholder.__yaml_import__
		const absolutePath = resolve(basePath, path)
		const mod = await import(absolutePath)

		return property.split('.').reduce((current: unknown, segment) => {
			if (current === null || typeof current !== 'object') {
				throw new Error(`Cannot resolve property "${property}" from module "${path}"`)
			}

			return (current as Record<string, unknown>)[segment]
		}, mod)
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
