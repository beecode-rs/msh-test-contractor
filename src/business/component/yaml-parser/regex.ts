const REGEX_PATTERN = /^new RegExp\(\s*(['"`])(.*?)\1\s*(?:,\s*(['"`])(.*?)\3\s*)?\)$/

export class YamlParserRegex {
	protected _isStringValue(value: unknown): value is string {
		return typeof value === 'string'
	}

	protected _isRegexPatternMatch(value: string): boolean {
		return REGEX_PATTERN.test(value)
	}

	protected _extractPatternFromMatch(match: RegExpExecArray): string | undefined {
		return match[2]
	}

	protected _extractFlagsFromMatch(match: RegExpExecArray): string {
		return match[4] ?? ''
	}

	protected _createRegExpSafely(pattern: string, flags: string): RegExp | undefined {
		try {
			return new RegExp(pattern, flags)
		} catch {
			return
		}
	}

	protected _parseRegexFromMatch(match: RegExpExecArray): RegExp | undefined {
		const pattern = this._extractPatternFromMatch(match)
		if (pattern === undefined) {
			return
		}

		const flags = this._extractFlagsFromMatch(match)

		return this._createRegExpSafely(pattern, flags)
	}

	isString(params: { value: unknown }): boolean {
		const { value } = params

		if (!this._isStringValue(value)) {
			return false
		}

		return this._isRegexPatternMatch(value)
	}

	parse(params: { value: unknown }): RegExp | undefined {
		const { value } = params

		if (!this._isStringValue(value)) {
			return
		}

		const match = REGEX_PATTERN.exec(value)
		if (match === null) {
			return
		}

		return this._parseRegexFromMatch(match)
	}
}
