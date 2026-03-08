const DATE_PATTERN = /^new Date\(\s*(['"`])(.*?)\1\s*\)$/

export class YamlParserDate {
	protected _isStringValue(value: unknown): value is string {
		return typeof value === 'string'
	}

	protected _isDatePatternMatch(value: string): boolean {
		return DATE_PATTERN.test(value)
	}

	protected _extractDateStringFromMatch(match: RegExpExecArray): string | undefined {
		return match[2]
	}

	protected _isValidDate(date: Date): boolean {
		return !Number.isNaN(date.getTime())
	}

	protected _parseDateFromMatch(match: RegExpExecArray): Date | undefined {
		const dateString = this._extractDateStringFromMatch(match)
		if (dateString === undefined) {
			return
		}

		const date = new Date(dateString)
		if (!this._isValidDate(date)) {
			return
		}

		return date
	}

	isString(params: { value: unknown }): boolean {
		const { value } = params

		if (!this._isStringValue(value)) {
			return false
		}

		return this._isDatePatternMatch(value)
	}

	parse(params: { value: unknown }): Date | undefined {
		const { value } = params

		if (!this._isStringValue(value)) {
			return
		}

		const match = DATE_PATTERN.exec(value)
		if (match === null) {
			return
		}

		return this._parseDateFromMatch(match)
	}
}
