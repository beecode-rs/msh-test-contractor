import { describe, expect, it } from 'vitest'

import { YamlParserRegex } from '#src/business/component/yaml-parser/regex.js'

describe('regex', () => {
	const service = new YamlParserRegex()

	describe('parse', () => {
		describe('basic regex parsing', () => {
			it('should parse new RegExp("^[a-z]+$") with double quotes', () => {
				const result = service.parse({ value: 'new RegExp("^[a-z]+$")' })

				expect(result).toBeInstanceOf(RegExp)
				expect(result?.source).toBe('^[a-z]+$')
				expect(result?.flags).toBe('')
			})

			it('should parse new RegExp("^[a-z]+$") with single quotes', () => {
				const result = service.parse({ value: "new RegExp('^[a-z]+$')" })

				expect(result).toBeInstanceOf(RegExp)
				expect(result?.source).toBe('^[a-z]+$')
			})

			it('should parse new RegExp("^[a-z]+$") with backticks', () => {
				const result = service.parse({ value: 'new RegExp(`^[a-z]+$`)' })

				expect(result).toBeInstanceOf(RegExp)
				expect(result?.source).toBe('^[a-z]+$')
			})
		})

		describe('flags parsing', () => {
			it('should parse new RegExp("^[a-z]+$", "gi") with flags', () => {
				const result = service.parse({ value: 'new RegExp("^[a-z]+$", "gi")' })

				expect(result).toBeInstanceOf(RegExp)
				expect(result?.source).toBe('^[a-z]+$')
				expect(result?.flags).toBe('gi')
				expect(result?.global).toBe(true)
				expect(result?.ignoreCase).toBe(true)
			})

			it('should parse with single flag', () => {
				const result = service.parse({ value: 'new RegExp("test", "i")' })

				expect(result?.flags).toBe('i')
				expect(result?.ignoreCase).toBe(true)
			})

			it('should parse with multiple flags', () => {
				const result = service.parse({ value: 'new RegExp("test", "gims")' })

				expect(result?.flags).toBe('gims')
			})

			it('should handle flags with different quote styles', () => {
				const result = service.parse({ value: "new RegExp('test', 'gi')" })

				expect(result?.flags).toBe('gi')
			})
		})

		describe('regex.exec() functionality', () => {
			it('should execute regex.test() correctly', () => {
				const result = service.parse({ value: 'new RegExp("^[a-z]+$")' })

				expect(result?.test('hello')).toBe(true)
				expect(result?.test('Hello')).toBe(false)
				expect(result?.test('123')).toBe(false)
			})

			it('should execute regex.exec() correctly', () => {
				const result = service.parse({ value: 'new RegExp("[a-z]+")' })

				const match = result?.exec('hello world')
				expect(match).not.toBeNull()
				expect(match?.[0]).toBe('hello')
				expect(match?.index).toBe(0)
			})

			it('should work with global flag', () => {
				const result = service.parse({ value: 'new RegExp("[a-z]+", "g")' })

				const text = 'hello world'
				const matches = text.match(result!)
				expect(matches).toEqual(['hello', 'world'])
			})

			it('should work with case-insensitive flag', () => {
				const result = service.parse({ value: 'new RegExp("^[a-z]+$", "i")' })

				expect(result?.test('HELLO')).toBe(true)
				expect(result?.test('Hello')).toBe(true)
			})
		})

		describe('special patterns', () => {
			it('should parse empty pattern', () => {
				const result = service.parse({ value: 'new RegExp("")' })

				expect(result).toBeInstanceOf(RegExp)
				expect(result?.source).toBe('(?:)')
			})

			it('should parse pattern with escaped characters', () => {
				const result = service.parse({ value: 'new RegExp("\\d+")' })

				expect(result?.source).toBe('\\d+')
				expect(result?.test('123')).toBe(true)
			})

			it('should parse pattern with special regex characters', () => {
				const result = service.parse({ value: 'new RegExp("[a-z]{2,4}")' })

				expect(result?.source).toBe('[a-z]{2,4}')
				expect(result?.test('ab')).toBe(true)
				expect(result?.test('a')).toBe(false)
			})
		})

		describe('invalid syntax handling', () => {
			it('should return undefined for non-string values', () => {
				expect(service.parse({ value: null })).toBeUndefined()
				expect(service.parse({ value: undefined })).toBeUndefined()
				expect(service.parse({ value: 123 })).toBeUndefined()
				expect(service.parse({ value: {} })).toBeUndefined()
				expect(service.parse({ value: [] })).toBeUndefined()
			})

			it('should return undefined for invalid RegExp syntax', () => {
				expect(service.parse({ value: 'RegExp("test")' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp()' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp(test)' })).toBeUndefined()
				expect(service.parse({ value: 'just a string' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp' })).toBeUndefined()
			})

			it('should return undefined for mismatched quotes', () => {
				expect(service.parse({ value: 'new RegExp("test\')' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp(\'test")' })).toBeUndefined()
			})

			it('should return undefined for invalid regex patterns', () => {
				expect(service.parse({ value: 'new RegExp("[" )' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp("(")' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp("*")' })).toBeUndefined()
			})

			it('should return undefined for invalid flags', () => {
				expect(service.parse({ value: 'new RegExp("test", "x")' })).toBeUndefined()
				expect(service.parse({ value: 'new RegExp("test", "gp")' })).toBeUndefined()
			})
		})
	})

	describe('isString', () => {
		it('should return true for valid RegExp syntax', () => {
			expect(service.isString({ value: 'new RegExp("^[a-z]+$")' })).toBe(true)
			expect(service.isString({ value: "new RegExp('^[a-z]+$')" })).toBe(true)
			expect(service.isString({ value: 'new RegExp(`^[a-z]+$`)' })).toBe(true)
			expect(service.isString({ value: 'new RegExp("test", "gi")' })).toBe(true)
		})

		it('should return false for invalid RegExp syntax', () => {
			expect(service.isString({ value: 'RegExp("test")' })).toBe(false)
			expect(service.isString({ value: 'new RegExp()' })).toBe(false)
			expect(service.isString({ value: 'just a string' })).toBe(false)
		})

		it('should return false for non-string values', () => {
			expect(service.isString({ value: null })).toBe(false)
			expect(service.isString({ value: undefined })).toBe(false)
			expect(service.isString({ value: 123 })).toBe(false)
			expect(service.isString({ value: {} })).toBe(false)
		})
	})

	describe('private methods', () => {
		describe('_isStringValue', () => {
			it('should return true for string values', () => {
				expect((service as unknown as { _isStringValue: (v: unknown) => boolean })._isStringValue('test')).toBe(true)
			})

			it('should return false for non-string values', () => {
				expect((service as unknown as { _isStringValue: (v: unknown) => boolean })._isStringValue(123)).toBe(false)
				expect((service as unknown as { _isStringValue: (v: unknown) => boolean })._isStringValue(null)).toBe(false)
			})
		})

		describe('_isRegexPatternMatch', () => {
			it('should return true for valid regex patterns', () => {
				expect(
					(service as unknown as { _isRegexPatternMatch: (v: string) => boolean })._isRegexPatternMatch('new RegExp("test")')
				).toBe(true)
				expect(
					(service as unknown as { _isRegexPatternMatch: (v: string) => boolean })._isRegexPatternMatch("new RegExp('test')")
				).toBe(true)
			})

			it('should return false for invalid regex patterns', () => {
				expect(
					(service as unknown as { _isRegexPatternMatch: (v: string) => boolean })._isRegexPatternMatch('RegExp("test")')
				).toBe(false)
				expect(
					(service as unknown as { _isRegexPatternMatch: (v: string) => boolean })._isRegexPatternMatch('new RegExp()')
				).toBe(false)
			})
		})

		describe('_createRegExpSafely', () => {
			it('should create valid regex', () => {
				const result = (
					service as unknown as { _createRegExpSafely: (p: string, f: string) => RegExp | null }
				)._createRegExpSafely('^[a-z]+$', '')
				expect(result).toBeInstanceOf(RegExp)
				expect(result?.source).toBe('^[a-z]+$')
			})

			it('should return undefined for invalid regex pattern', () => {
				expect(
					(service as unknown as { _createRegExpSafely: (p: string, f: string) => RegExp | undefined })._createRegExpSafely(
						'[',
						''
					)
				).toBeUndefined()
			})

			it('should return undefined for invalid flags', () => {
				expect(
					(service as unknown as { _createRegExpSafely: (p: string, f: string) => RegExp | undefined })._createRegExpSafely(
						'test',
						'x'
					)
				).toBeUndefined()
			})
		})
	})
})
