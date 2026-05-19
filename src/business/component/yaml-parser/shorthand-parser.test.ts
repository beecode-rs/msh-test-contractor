import { describe, expect, it } from 'vitest'

import { ShorthandParseError, ShorthandParser, parseShorthandTerm } from '#src/business/component/yaml-parser/shorthand-parser.js'

describe('shorthand-parser', () => {
	const parser = new ShorthandParser()

	describe('parseShorthandTerm function', () => {
		it('should be a convenience function that creates parser and calls parse', () => {
			const result = parseShorthandTerm('[1, 2] => 3')
			expect(result).toEqual({ params: [1, 2], result: 3 })
		})
	})

	describe('parse', () => {
		describe('basic format: [params] => result', () => {
			it('should parse [1, 2] => 3', () => {
				const result = parser.parse('[1, 2] => 3')
				expect(result).toEqual({ params: [1, 2], result: 3 })
			})

			it('should parse string params: ["hello"] => "world"', () => {
				const result = parser.parse('["hello"] => "world"')
				expect(result).toEqual({ params: ['hello'], result: 'world' })
			})

			it('should reject single quotes (JSON requires double quotes)', () => {
				// JSON.parse doesn't accept single quotes
				expect(() => parser.parse("['hello'] => 'world'")).toThrow(ShorthandParseError)
			})

			it('should parse object params: [{"id": 1}] => {"name": "test"}', () => {
				const result = parser.parse('[{"id": 1}] => {"name": "test"}')
				expect(result).toEqual({ params: [{ id: 1 }], result: { name: 'test' } })
			})

			it('should parse nested arrays: [[1, 2], [3, 4]] => "flat"', () => {
				const result = parser.parse('[[1, 2], [3, 4]] => "flat"')
				expect(result).toEqual({
					params: [
						[1, 2],
						[3, 4],
					],
					result: 'flat',
				})
			})

			it('should parse single param: [42] => "answer"', () => {
				const result = parser.parse('[42] => "answer"')
				expect(result).toEqual({ params: [42], result: 'answer' })
			})

			it('should parse multiple params: [1, "two", true, null] => "mixed"', () => {
				const result = parser.parse('[1, "two", true, null] => "mixed"')
				expect(result).toEqual({ params: [1, 'two', true, null], result: 'mixed' })
			})

			it('should handle whitespace around delimiter: [1, 2]   =>   3', () => {
				const result = parser.parse('[1, 2]   =>   3')
				expect(result).toEqual({ params: [1, 2], result: 3 })
			})
		})

		describe('no-arg format: => result', () => {
			it('should parse => "default"', () => {
				const result = parser.parse('=> "default"')
				expect(result).toEqual({ params: [], result: 'default' })
			})

			it('should parse => null', () => {
				const result = parser.parse('=> null')
				expect(result).toEqual({ params: [], result: null })
			})

			it('should parse => {"status": "ok"}', () => {
				const result = parser.parse('=> {"status": "ok"}')
				expect(result).toEqual({ params: [], result: { status: 'ok' } })
			})

			it('should parse => []', () => {
				const result = parser.parse('=> []')
				expect(result).toEqual({ params: [], result: [] })
			})
		})

		describe('constructor format: (ctor); [params] => result', () => {
			it('should parse (["db-config"]); ["userId"] => "user"', () => {
				const result = parser.parse('(["db-config"]); ["userId"] => "user"')
				expect(result).toEqual({
					constructorParams: ['db-config'],
					params: ['userId'],
					result: 'user',
				})
			})

			it('should parse (["ctor"]); => "result"', () => {
				const result = parser.parse('(["ctor"]); => "result"')
				expect(result).toEqual({
					constructorParams: ['ctor'],
					params: [],
					result: 'result',
				})
			})

			it('should parse multiple constructor params: [[1, 2], "config"]; [true] => "done"', () => {
				const result = parser.parse('([[1, 2], "config"]); [true] => "done"')
				expect(result).toEqual({
					constructorParams: [[1, 2], 'config'],
					params: [true],
					result: 'done',
				})
			})
		})

		describe('edge cases', () => {
			it('should handle empty arrays: [] => []', () => {
				const result = parser.parse('[] => []')
				expect(result).toEqual({ params: [], result: [] })
			})

			it('should handle null values: [null] => null', () => {
				const result = parser.parse('[null] => null')
				expect(result).toEqual({ params: [null], result: null })
			})

			it('should handle boolean values: [true, false] => true', () => {
				const result = parser.parse('[true, false] => true')
				expect(result).toEqual({ params: [true, false], result: true })
			})

			it('should handle special characters in strings: ["hello \\"world\\""] => "test"', () => {
				const result = parser.parse('["hello \\"world\\""] => "test"')
				expect(result).toEqual({ params: ['hello "world"'], result: 'test' })
			})

			it('should handle nested objects: [{"a": {"b": 1}}] => {"c": [1, 2]}', () => {
				const result = parser.parse('[{"a": {"b": 1}}] => {"c": [1, 2]}')
				expect(result).toEqual({ params: [{ a: { b: 1 } }], result: { c: [1, 2] } })
			})

			it('should handle numbers: [1.5, -2, 0] => 42', () => {
				const result = parser.parse('[1.5, -2, 0] => 42')
				expect(result).toEqual({ params: [1.5, -2, 0], result: 42 })
			})

			it('should handle unicode strings: ["hello \\u0041"] => "世界"', () => {
				const result = parser.parse('["hello \\u0041"] => "世界"')
				expect(result).toEqual({ params: ['hello A'], result: '世界' })
			})
		})

		describe('error handling', () => {
			it('should throw ShorthandParseError for empty input', () => {
				expect(() => parser.parse('')).toThrow(ShorthandParseError)
				expect(() => parser.parse('')).toThrow('Empty input')
			})

			it('should throw ShorthandParseError for missing => delimiter', () => {
				expect(() => parser.parse('[1, 2]')).toThrow(ShorthandParseError)
				expect(() => parser.parse('[1, 2]')).toThrow('Missing "=>" delimiter')
			})

			it('should throw ShorthandParseError for missing result', () => {
				expect(() => parser.parse('[1, 2] =>')).toThrow(ShorthandParseError)
				expect(() => parser.parse('[1, 2] =>')).toThrow('Missing result value')
			})

			it('should throw ShorthandParseError for invalid JSON in params', () => {
				expect(() => parser.parse('[invalid] => 1')).toThrow(ShorthandParseError)
				expect(() => parser.parse('[invalid] => 1')).toThrow('Invalid JSON in params')
			})

			it('should throw ShorthandParseError for invalid JSON in result', () => {
				expect(() => parser.parse('[1] => invalid')).toThrow(ShorthandParseError)
				expect(() => parser.parse('[1] => invalid')).toThrow('Invalid JSON in result')
			})

			it('should throw ShorthandParseError for params not being an array', () => {
				expect(() => parser.parse('{"a": 1} => 1')).toThrow(ShorthandParseError)
				expect(() => parser.parse('{"a": 1} => 1')).toThrow('Params must be a JSON array')
			})

			it('should throw ShorthandParseError for invalid constructor params', () => {
				expect(() => parser.parse('([undefined]); [1] => 2')).toThrow(ShorthandParseError)
				expect(() => parser.parse('([undefined]); [1] => 2')).toThrow('Invalid JSON in constructor params')
			})

			it('should include input in error message', () => {
				try {
					parser.parse('[invalid] => 1')
				} catch (e) {
					expect(e).toBeInstanceOf(ShorthandParseError)
					expect((e as ShorthandParseError).input).toBe('[invalid]')
				}
			})
		})
	})

	describe('_findArrowPosition', () => {
		it('should find arrow at top level', () => {
			expect((parser as unknown as { _findArrowPosition: (s: string) => number })._findArrowPosition('[1] => 2')).toBe(4)
		})

		it('should not find arrow inside brackets', () => {
			expect((parser as unknown as { _findArrowPosition: (s: string) => number })._findArrowPosition('["a => b"] => 2')).toBe(11)
		})

		it('should not find arrow inside nested brackets', () => {
			expect((parser as unknown as { _findArrowPosition: (s: string) => number })._findArrowPosition('[{"x": "=>"}] => 1')).toBe(
				14
			)
		})

		it('should return -1 if no arrow found', () => {
			expect((parser as unknown as { _findArrowPosition: (s: string) => number })._findArrowPosition('[1, 2]')).toBe(-1)
		})
	})

	describe('_parseJsonArray', () => {
		it('should parse valid JSON array', () => {
			expect((parser as unknown as { _parseJsonArray: (s: string) => unknown[] })._parseJsonArray('[1, 2, 3]')).toEqual([1, 2, 3])
		})

		it('should throw for non-array JSON', () => {
			expect(() => (parser as unknown as { _parseJsonArray: (s: string) => unknown[] })._parseJsonArray('{"a": 1}')).toThrow(
				ShorthandParseError
			)
		})

		it('should throw for invalid JSON', () => {
			expect(() => (parser as unknown as { _parseJsonArray: (s: string) => unknown[] })._parseJsonArray('[invalid]')).toThrow(
				ShorthandParseError
			)
		})
	})

	describe('_parseConstructorParams', () => {
		it('should parse single param in array', () => {
			expect(
				(parser as unknown as { _parseConstructorParams: (s: string) => unknown[] })._parseConstructorParams('(["a"])')
			).toEqual(['a'])
		})

		it('should parse multiple params in array', () => {
			expect(
				(parser as unknown as { _parseConstructorParams: (s: string) => unknown[] })._parseConstructorParams('([1, 2, 3])')
			).toEqual([1, 2, 3])
		})

		it('should throw for missing parentheses', () => {
			expect(() =>
				(parser as unknown as { _parseConstructorParams: (s: string) => unknown[] })._parseConstructorParams('["a"]')
			).toThrow(ShorthandParseError)
		})

		it('should throw for content that is not a JSON array', () => {
			expect(() =>
				(parser as unknown as { _parseConstructorParams: (s: string) => unknown[] })._parseConstructorParams('("a")')
			).toThrow(ShorthandParseError)
		})
	})

	describe('_parseResult', () => {
		it('should parse number result', () => {
			expect((parser as unknown as { _parseResult: (s: string) => unknown })._parseResult('42')).toBe(42)
		})

		it('should parse string result', () => {
			expect((parser as unknown as { _parseResult: (s: string) => unknown })._parseResult('"hello"')).toBe('hello')
		})

		it('should parse object result', () => {
			expect((parser as unknown as { _parseResult: (s: string) => unknown })._parseResult('{"a": 1}')).toEqual({ a: 1 })
		})

		it('should throw for empty result', () => {
			expect(() => (parser as unknown as { _parseResult: (s: string) => unknown })._parseResult('')).toThrow(ShorthandParseError)
		})

		it('should throw for invalid JSON', () => {
			expect(() => (parser as unknown as { _parseResult: (s: string) => unknown })._parseResult('invalid')).toThrow(
				ShorthandParseError
			)
		})
	})
})
