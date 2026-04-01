import { YamlParserDate } from './date.js'
import { YamlParserError } from './error.js'
import { YamlParserPromise } from './promise.js'
import { YamlParserRegex } from './regex.js'
import { parseShorthandTerm } from './shorthand-parser.js'
import { YamlParserSpecialObject } from './special-object.js'
import * as yaml from 'js-yaml'
import { readFile } from 'node:fs/promises'

import type { YamlContractFunction, YamlContractModel, YamlContractTerm } from '#src/business/model/yaml-contract-model.js'

type RawYamlTerm = {
	params?: unknown[]
	result?: unknown
	error?: unknown
}

type RawYamlMethod = {
	terms?: RawYamlTerm[]
}

type RawYamlContract = Record<string, unknown> & {
	subject?: string
	module?: string
	methods?: Record<string, RawYamlMethod>
	constructor?: RawYamlMethod
	subjectType?: 'function' | 'class'
	mock?: string[]
}

export class YamlParserContract {
	protected readonly _specialObjectParser: YamlParserSpecialObject

	constructor() {
		const yamlParserError = new YamlParserError()
		const yamlParserDate = new YamlParserDate()
		const yamlParserRegex = new YamlParserRegex()
		const yamlParserPromise = new YamlParserPromise(yamlParserError)
		this._specialObjectParser = new YamlParserSpecialObject(yamlParserError, yamlParserPromise, yamlParserDate, yamlParserRegex)
	}

	async parseFile(params: { path: string }): Promise<YamlContractModel> {
		const { path } = params

		const fileContent = await this._readFileContent({ path })

		return this.parseString({ yaml: fileContent })
	}

	parseString(params: { yaml: string }): YamlContractModel {
		const { yaml: yamlString } = params
		const rawObject = yaml.load(yamlString)

		if (rawObject === null || typeof rawObject !== 'object') {
			throw new Error('Invalid YAML: expected an object at the root')
		}

		const contract = rawObject as RawYamlContract
		const fns = this._methodsToContractFunctions(contract.methods)

		if (Object.hasOwn(rawObject, 'constructor')) {
			fns['constructor'] = this._methodToContractFunction(contract.constructor!)
		}

		const subjectType = this._resolveSubjectType(contract, rawObject)

		const result: YamlContractModel = {
			fns,
			module: contract.module ?? '',
			subjectName: contract.subject ?? '',
			subjectType,
		}

		if (contract.mock) {
			result.mock = contract.mock
		}

		return result
	}

	protected async _readFileContent(params: { path: string }): Promise<string> {
		const { path } = params

		try {
			return await readFile(path, 'utf-8')
		} catch (error) {
			throw this._createFileReadError({ error, path })
		}
	}

	protected _createFileReadError(params: { path: string; error: unknown }): Error {
		const { path, error } = params

		if (!(error instanceof Error)) {
			return new Error(`Failed to read YAML contract file "${path}": Unknown error`)
		}

		const nodeError = error as NodeJS.ErrnoException
		if (nodeError.code === 'ENOENT') {
			return new Error(`YAML contract file not found: ${path}`)
		}
		if (nodeError.code === 'EACCES') {
			return new Error(`Permission denied reading YAML contract file: ${path}`)
		}

		return new Error(`Failed to read YAML contract file "${path}": ${error.message}`)
	}

	protected _resolveSubjectType(contract: RawYamlContract, rawObject: object): 'function' | 'class' {
		if (contract.subjectType === 'class' || contract.subjectType === 'function') {
			return contract.subjectType
		}

		if (Object.hasOwn(rawObject, 'constructor')) {
			return 'class'
		}

		return 'function'
	}

	protected _methodsToContractFunctions(
		methods: Record<string, RawYamlMethod> | undefined
	): Record<string, YamlContractFunction> {
		if (!methods) {
			return {}
		}

		return Object.fromEntries(
			Object.entries(methods).map(([methodName, method]) => [methodName, this._methodToContractFunction(method)])
		)
	}

	protected _methodToContractFunction(method: RawYamlMethod): YamlContractFunction {
		return {
			terms: this._rawTermsToContractTerms(method.terms),
		}
	}

	protected _rawTermsToContractTerms(terms: RawYamlTerm[] | undefined): YamlContractTerm[] {
		if (!terms) {
			return []
		}

		return terms.map((term) => this._rawTermToContractTerm(term))
	}

	protected _rawTermToContractTerm(term: RawYamlTerm): YamlContractTerm {
		if (this._isShorthandTermFormat(term)) {
			return this._parseShorthandTermToContractTerm(term)
		}

		return this._buildContractTermFromRaw(term)
	}

	protected _isShorthandTermFormat(term: RawYamlTerm): boolean {
		const keys = Object.keys(term)
		if (keys.length !== 1) {
			return false
		}

		const firstKey = keys[0]
		if (!firstKey) {
			return false
		}

		const value = (term as Record<string, unknown>)[firstKey]

		return typeof value === 'string' && this._isArrowSyntaxString(value)
	}

	protected _isArrowSyntaxString(value: string): boolean {
		const trimmed = value.trim()

		return trimmed.includes('=>') && !trimmed.includes('\n')
	}

	protected _parseShorthandTermToContractTerm(term: RawYamlTerm): YamlContractTerm {
		const key = Object.keys(term)[0]
		if (!key) {
			return {}
		}

		const stringValue = (term as Record<string, unknown>)[key]
		if (typeof stringValue !== 'string') {
			return {}
		}

		try {
			const parsed = parseShorthandTerm(stringValue)

			return this._buildContractTermFromParsedShorthand(parsed)
		} catch {
			return {}
		}
	}

	protected _buildContractTermFromParsedShorthand(parsed: {
		constructorParams?: unknown[]
		params?: unknown[]
		result?: unknown
	}): YamlContractTerm {
		const result: YamlContractTerm = {}

		if (parsed.constructorParams !== undefined) {
			result.constructorParams = this._parseSpecialObjectsRecursively(parsed.constructorParams) as unknown[]
		}

		if (parsed.params !== undefined) {
			result.params = this._parseSpecialObjectsRecursively(parsed.params) as unknown[]
		}

		if (parsed.result !== undefined) {
			result.result = this._parseSpecialObjectsRecursively(parsed.result)
		}

		return result
	}

	protected _buildContractTermFromRaw(term: RawYamlTerm): YamlContractTerm {
		const transformed: YamlContractTerm = {}

		if (term.params !== undefined) {
			transformed.params = this._parseSpecialObjectsRecursively(term.params) as unknown[]
		}

		if (term.result !== undefined) {
			transformed.result = this._parseSpecialObjectsRecursively(term.result)
		}

		if (term.error !== undefined) {
			transformed.error = this._parseSpecialObjectsRecursively(term.error)
		}

		return transformed
	}

	protected _parseSpecialObjectsRecursively(value: unknown): unknown {
		if (typeof value === 'string') {
			return this._specialObjectParser.parse({ value })
		}

		if (Array.isArray(value)) {
			return value.map((item) => this._parseSpecialObjectsRecursively(item))
		}

		if (value !== null && typeof value === 'object') {
			return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, this._parseSpecialObjectsRecursively(val)]))
		}

		return value
	}
}
