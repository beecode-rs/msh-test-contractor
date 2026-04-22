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

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	protected _tryParseFunction(value: string): Function | undefined {
		if (value === '__fn__') {
			return function () {
				return undefined
			}
		}

		if (value === '__fn_identity__') {
			return function (a: unknown): unknown {
				return a
			}
		}

		return undefined
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	protected _tryParseClassRef(value: string): Function | undefined {
		const match = /^__class_ref:(\w+)__$/.exec(value)
		if (!match) {
			return undefined
		}

		const className = match[1]!
		const globalObj = globalThis as Record<string, unknown>

		if (className in globalObj && typeof globalObj[className] === 'function') {
			return globalObj[className]
		}

		return undefined
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

		const fn = this._tryParseFunction(value)
		if (fn !== undefined) {
			return fn
		}

		const classRef = this._tryParseClassRef(value)
		if (classRef !== undefined) {
			return classRef
		}

		const importRef = this._tryParseImport(value)
		if (importRef !== undefined) {
			return importRef
		}

		return value
	}

	protected _tryParseImport(value: string): { __yaml_import__: { path: string; property: string } } | undefined {
		const match = /^__import__:([^:]+):(.+)$/.exec(value)
		if (!match) {
			return undefined
		}

		return { __yaml_import__: { path: match[1]!, property: match[2]! } }
	}

	parse(params: { value: unknown }): unknown {
		const { value } = params

		if (!this._isStringValue(value)) {
			return value
		}

		return this._parseSpecialObjectFromString(value)
	}
}
