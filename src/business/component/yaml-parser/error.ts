const ERROR_PATTERN = /^new Error\(\s*(['"`])(.*?)\1\s*(?:,\s*(\{[^}]+\}))?\s*\)$/

export class YamlParserError {
	protected _isStringValue(value: unknown): value is string {
		return typeof value === 'string'
	}

	protected _isErrorPatternMatch(value: string): boolean {
		return ERROR_PATTERN.test(value)
	}

	protected _extractErrorMessageFromMatch(match: RegExpExecArray): string | undefined {
		return match[2]
	}

	protected _extractOptionsStringFromMatch(match: RegExpExecArray): string | undefined {
		return match[3]
	}

	protected _extractErrorNameFromOptions(optionsStr: string): string | undefined {
		const optionsMatch = /name\s*:\s*(['"`])(.+?)\1/.exec(optionsStr)

		return optionsMatch?.[2]
	}

	protected _applyErrorNameFromOptions(error: Error, optionsStr: string): void {
		try {
			const name = this._extractErrorNameFromOptions(optionsStr)
			if (name !== undefined) {
				error.name = name
			}
		} catch {
			// Ignore parsing errors for options
		}
	}

	protected _createErrorFromMatch(match: RegExpExecArray): Error {
		const message = this._extractErrorMessageFromMatch(match)
		if (message === undefined) {
			return new Error()
		}

		const error = new Error(message)

		const optionsStr = this._extractOptionsStringFromMatch(match)
		if (optionsStr !== undefined) {
			this._applyErrorNameFromOptions(error, optionsStr)
		}

		return error
	}

	isString(params: { value: unknown }): boolean {
		const { value } = params

		if (!this._isStringValue(value)) {
			return false
		}

		return this._isErrorPatternMatch(value)
	}

	parse(params: { value: unknown }): Error | undefined {
		const { value } = params

		if (!this._isStringValue(value)) {
			return
		}

		const match = ERROR_PATTERN.exec(value)
		if (match === null) {
			return
		}

		return this._createErrorFromMatch(match)
	}
}
