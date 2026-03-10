export class ShorthandParseError extends Error {
	constructor(
		message: string,
		readonly input: string
	) {
		super(`Shorthand parse error: ${message}. Input: "${input}"`)
		this.name = 'ShorthandParseError'
	}
}

export type ParsedShorthand = {
	params?: unknown[]
	result?: unknown
	constructorParams?: unknown[]
}

export class ShorthandParser {
	protected _findArrowPosition(input: string): number {
		type State = { depth: number; foundAt: number; inString: string | null }

		const chars = input.split('')
		const initialState: State = { depth: 0, foundAt: -1, inString: null }

		const result = chars.slice(0, -1).reduce<State>((state, char, i) => {
			if (state.foundAt !== -1) {
				return state
			}

			const nextChar = input[i + 1]
			const prevChar = this._getPrevChar(input, i)
			const isQuoteChar = char === '"' || char === "'" || char === '`'
			const isUnescapedQuote = isQuoteChar && prevChar !== '\\'

			if (isUnescapedQuote) {
				return { ...state, inString: this._toggleInString(state.inString, char) }
			}

			if (state.inString !== null) {
				return state
			}

			const isOpening = char === '(' || char === '[' || char === '{'
			const isClosing = char === ')' || char === ']' || char === '}'
			const isArrow = char === '=' && nextChar === '>' && state.depth === 0

			if (isOpening) {
				return { ...state, depth: state.depth + 1 }
			}

			if (isClosing) {
				return { ...state, depth: state.depth - 1 }
			}

			if (isArrow) {
				return { ...state, foundAt: i }
			}

			return state
		}, initialState)

		return result.foundAt
	}

	protected _toggleInString(current: string | null, char: string): string | null {
		if (current === char) {
			return null
		}

		if (current === null) {
			return char
		}

		return current
	}

	protected _getPrevChar(input: string, index: number): string {
		if (index > 0) {
			return input[index - 1] ?? ''
		}

		return ''
	}

	protected _parseJsonArray(value: string): unknown[] {
		const trimmed = value.trim()
		if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
			throw new ShorthandParseError(`Params must be a JSON array`, trimmed)
		}
		try {
			const parsed = JSON.parse(trimmed)
			if (!Array.isArray(parsed)) {
				throw new ShorthandParseError(`Params must be a JSON array`, trimmed)
			}

			return parsed
		} catch (e) {
			if (e instanceof ShorthandParseError) {
				throw e
			}
			throw new ShorthandParseError(`Invalid JSON in params: ${(e as Error).message}`, trimmed)
		}
	}

	protected _parseConstructorParams(value: string): unknown[] {
		const trimmed = value.trim()
		if (!trimmed.startsWith('(') || !trimmed.endsWith(')')) {
			throw new ShorthandParseError(`Constructor params must be wrapped in parentheses`, trimmed)
		}

		const content = trimmed.slice(1, -1).trim()
		if (!content.startsWith('[') || !content.endsWith(']')) {
			throw new ShorthandParseError(`Constructor params must be a JSON array inside parentheses`, trimmed)
		}

		try {
			const parsed = JSON.parse(content)
			if (!Array.isArray(parsed)) {
				throw new ShorthandParseError(`Constructor params must be an array`, trimmed)
			}

			return parsed
		} catch (e) {
			if (e instanceof ShorthandParseError) {
				throw e
			}
			throw new ShorthandParseError(`Invalid JSON in constructor params: ${(e as Error).message}`, trimmed)
		}
	}

	protected _parseResult(value: string): unknown {
		const trimmed = value.trim()
		if (trimmed === '') {
			throw new ShorthandParseError(`Missing result value`, value)
		}
		try {
			return JSON.parse(trimmed)
		} catch (e) {
			throw new ShorthandParseError(`Invalid JSON in result: ${(e as Error).message}`, trimmed)
		}
	}

	parse(input: string): ParsedShorthand {
		const trimmed = input.trim()

		if (trimmed === '') {
			throw new ShorthandParseError('Empty input', input)
		}

		const arrowPos = this._findArrowPosition(trimmed)
		if (arrowPos === -1) {
			throw new ShorthandParseError('Missing "=>" delimiter', input)
		}

		const beforeArrow = trimmed.slice(0, arrowPos).trim()
		const afterArrow = trimmed.slice(arrowPos + 2).trim()
		const result = this._parseResult(afterArrow)

		if (beforeArrow === '') {
			return { params: [], result }
		}

		const semicolonMatch = /^(.+?)\s*;\s*(.*)$/.exec(beforeArrow)

		if (semicolonMatch) {
			const ctorPart = semicolonMatch[1]!.trim()
			const paramsPart = semicolonMatch[2]!.trim()

			const constructorParams = this._parseConstructorParams(ctorPart)

			if (paramsPart === '') {
				return { constructorParams, params: [], result }
			}

			const params = this._parseJsonArray(paramsPart)

			return { constructorParams, params, result }
		}

		const params = this._parseJsonArray(beforeArrow)

		return { params, result }
	}
}

export function parseShorthandTerm(input: string): ParsedShorthand {
	const parser = new ShorthandParser()

	return parser.parse(input)
}
