import type { YamlParserDate } from './date.js'
import type { YamlParserError } from './error.js'
import type { YamlParserPromise } from './promise.js'
import type { YamlParserRegex } from './regex.js'

export class YamlParserSpecialObject {
	constructor(
		protected readonly _yamlParserError: YamlParserError,
		protected readonly _yamlParserPromise: YamlParserPromise,
		protected readonly _yamlParserDate: YamlParserDate,
		protected readonly _yamlParserRegex: YamlParserRegex
	) {}

	protected _isStringValue(value: unknown): value is string {
		return typeof value === 'string'
	}

	protected _tryParseError(value: string): Error | undefined {
		return this._yamlParserError.parse({ value })
	}

	protected _tryParsePromise(value: string): Promise<unknown> | undefined {
		return this._yamlParserPromise.parse({ value })
	}

	protected _tryParseDate(value: string): Date | undefined {
		return this._yamlParserDate.parse({ value })
	}

	protected _tryParseRegex(value: string): RegExp | undefined {
		return this._yamlParserRegex.parse({ value })
	}

	protected _parseSpecialObjectFromString(value: string): unknown {
		const error = this._tryParseError(value)
		if (error !== undefined) {
			return error
		}

		const promise = this._tryParsePromise(value)
		if (promise !== undefined) {
			return promise
		}

		const date = this._tryParseDate(value)
		if (date !== undefined) {
			return date
		}

		const regex = this._tryParseRegex(value)
		if (regex !== undefined) {
			return regex
		}

		return value
	}

	parse(params: { value: unknown }): unknown {
		const { value } = params

		if (!this._isStringValue(value)) {
			return value
		}

		return this._parseSpecialObjectFromString(value)
	}
}
