import type { YamlParserError } from './error.js'

const PROMISE_RESOLVE_PATTERN = /^Promise\.resolve\((.*)\)$/s
const PROMISE_REJECT_PATTERN = /^Promise\.reject\((.*)\)$/s

export class YamlParserPromise {
	constructor(protected readonly _yamlParserError: YamlParserError) {}

	protected _isStringValue(value: unknown): value is string {
		return typeof value === 'string'
	}

	protected _isResolvePatternMatch(value: string): boolean {
		return PROMISE_RESOLVE_PATTERN.test(value)
	}

	protected _isRejectPatternMatch(value: string): boolean {
		return PROMISE_REJECT_PATTERN.test(value)
	}

	protected _extractInnerValueFromMatch(match: RegExpExecArray): string | undefined {
		return match[1]
	}

	protected _isEmptyOrUndefined(value: string): boolean {
		return value === '' || value === 'undefined'
	}

	protected _isNullLiteral(value: string): boolean {
		return value === 'null'
	}

	protected _isBooleanLiteral(value: string): boolean {
		return value === 'true' || value === 'false'
	}

	protected _isNumericValue(value: string): boolean {
		return /^-?\d+\.?\d*$/.test(value)
	}

	protected _isQuotedString(value: string): boolean {
		return /^(['"`]).*\1$/.test(value)
	}

	protected _isJsonObjectOrArray(value: string): boolean {
		return value.startsWith('{') || value.startsWith('[')
	}

	protected _isErrorConstructor(value: string): boolean {
		return value.startsWith('new Error(')
	}

	protected _parseEmptyOrUndefined(): undefined {
		return undefined
	}

	protected _parseNullLiteral(): null {
		return null
	}

	protected _parseBooleanLiteral(value: string): boolean {
		return value === 'true'
	}

	protected _parseNumericValue(value: string): number {
		return Number(value)
	}

	protected _parseQuotedString(value: string): string {
		return value.slice(1, -1)
	}

	protected _parseJsonLikeValue(value: string): unknown {
		const jsonLike = value.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3').replace(/'/g, '"')

		try {
			return JSON.parse(jsonLike)
		} catch {
			return value
		}
	}

	protected _parseValueString(valueStr: string): unknown {
		const trimmed = valueStr.trim()

		if (this._isEmptyOrUndefined(trimmed)) {
			this._parseEmptyOrUndefined()

			return
		}

		if (this._isNullLiteral(trimmed)) {
			return this._parseNullLiteral()
		}

		if (this._isBooleanLiteral(trimmed)) {
			return this._parseBooleanLiteral(trimmed)
		}

		if (this._isNumericValue(trimmed)) {
			return this._parseNumericValue(trimmed)
		}

		if (this._isQuotedString(trimmed)) {
			return this._parseQuotedString(trimmed)
		}

		if (this._isErrorConstructor(trimmed)) {
			return this._yamlParserError.parse({ value: trimmed })
		}

		if (this._isJsonObjectOrArray(trimmed)) {
			return this._parseJsonLikeValue(trimmed)
		}

		return trimmed
	}

	protected _convertToRejectionError(value: unknown): Error {
		if (value instanceof Error) {
			return value
		}

		return new Error(String(value))
	}

	protected _parsePromiseReject(match: RegExpExecArray): Promise<unknown> | undefined {
		const innerValue = this._extractInnerValueFromMatch(match)
		if (innerValue === undefined) {
			return
		}

		const parsedValue = this._parseValueString(innerValue)
		const error = this._convertToRejectionError(parsedValue)

		return Promise.reject(error)
	}

	protected _parsePromiseResolve(match: RegExpExecArray): Promise<unknown> | undefined {
		const innerValue = this._extractInnerValueFromMatch(match)
		if (innerValue === undefined) {
			return
		}

		const parsedValue = this._parseValueString(innerValue)

		return Promise.resolve(parsedValue)
	}

	isRejectString(params: { value: unknown }): boolean {
		const { value } = params

		if (!this._isStringValue(value)) {
			return false
		}

		return this._isRejectPatternMatch(value)
	}

	isResolveString(params: { value: unknown }): boolean {
		const { value } = params

		if (!this._isStringValue(value)) {
			return false
		}

		return this._isResolvePatternMatch(value)
	}

	isString(params: { value: unknown }): boolean {
		const { value } = params

		return this.isResolveString({ value }) || this.isRejectString({ value })
	}

	parse(params: { value: unknown }): Promise<unknown> | undefined {
		const { value } = params

		const resolved = this.parseResolve({ value })
		if (resolved !== undefined) {
			return resolved
		}

		return this.parseReject({ value })
	}

	parseReject(params: { value: unknown }): Promise<unknown> | undefined {
		const { value } = params

		if (!this._isStringValue(value)) {
			return
		}

		const match = PROMISE_REJECT_PATTERN.exec(value)
		if (match === null) {
			return
		}

		return this._parsePromiseReject(match)
	}

	parseResolve(params: { value: unknown }): Promise<unknown> | undefined {
		const { value } = params

		if (!this._isStringValue(value)) {
			return
		}

		const match = PROMISE_RESOLVE_PATTERN.exec(value)
		if (match === null) {
			return
		}

		return this._parsePromiseResolve(match)
	}
}
