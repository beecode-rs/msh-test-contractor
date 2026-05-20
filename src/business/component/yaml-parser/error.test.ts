import { describe, expect, it } from 'vitest'

import { YamlParserError } from '#src/business/component/yaml-parser/error.js'

describe('error', () => {
	const service = new YamlParserError()

	describe('parse', () => {
		describe('basic error parsing', () => {
			it('should parse new Error("message") with double quotes', () => {
				const result = service.parse({ value: 'new Error("Something went wrong")' })

				expect(result).toBeInstanceOf(Error)
				expect(result?.message).toBe('Something went wrong')
				expect(result?.name).toBe('Error')
			})

			it('should parse new Error("message") with single quotes', () => {
				const result = service.parse({ value: "new Error('Something went wrong')" })

				expect(result).toBeInstanceOf(Error)
				expect(result?.message).toBe('Something went wrong')
			})

			it('should parse new Error(`message`) with backticks', () => {
				const result = service.parse({ value: 'new Error(`Something went wrong`)' })

				expect(result).toBeInstanceOf(Error)
				expect(result?.message).toBe('Something went wrong')
			})

			it('should handle empty message', () => {
				const result = service.parse({ value: 'new Error("")' })

				expect(result).toBeInstanceOf(Error)
				expect(result?.message).toBe('')
			})
		})

		describe('custom error name', () => {
			it('should parse new Error("message", { name: "CustomError" })', () => {
				const result = service.parse({ value: 'new Error("Not found", { name: "NotFoundError" })' })

				expect(result).toBeInstanceOf(Error)
				expect(result?.message).toBe('Not found')
				expect(result?.name).toBe('NotFoundError')
			})

			it('should handle single quotes in name option', () => {
				const result = service.parse({ value: "new Error('Failed', { name: 'MyError' })" })

				expect(result).toBeInstanceOf(Error)
				expect(result?.message).toBe('Failed')
				expect(result?.name).toBe('MyError')
			})

			it('should handle backticks in name option', () => {
				const result = service.parse({ value: 'new Error("Test", { name: `CustomError` })' })

				expect(result).toBeInstanceOf(Error)
				expect(result?.name).toBe('CustomError')
			})
		})

		describe('error properties preservation', () => {
			it('should preserve message property', () => {
				const result = service.parse({ value: 'new Error("Test message 123")' })

				expect(result?.message).toBe('Test message 123')
			})

			it('should preserve name property (default)', () => {
				const result = service.parse({ value: 'new Error("Test")' })

				expect(result?.name).toBe('Error')
			})

			it('should preserve name property (custom)', () => {
				const result = service.parse({ value: 'new Error("Test", { name: "ValidationError" })' })

				expect(result?.name).toBe('ValidationError')
			})

			it('should have stack property', () => {
				const result = service.parse({ value: 'new Error("Test")' })

				expect(result?.stack).toBeDefined()
				expect(typeof result?.stack).toBe('string')
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

			it('should return undefined for invalid error syntax', () => {
				expect(service.parse({ value: 'Error("message")' })).toBeUndefined()
				expect(service.parse({ value: 'new Error()' })).toBeUndefined()
				expect(service.parse({ value: 'new Error(message)' })).toBeUndefined()
				expect(service.parse({ value: 'just a string' })).toBeUndefined()
				expect(service.parse({ value: 'new Error' })).toBeUndefined()
			})

			it('should return undefined for malformed quotes', () => {
				expect(service.parse({ value: 'new Error("message\')' })).toBeUndefined()
				expect(service.parse({ value: 'new Error(message)' })).toBeUndefined()
			})
		})
	})

	describe('isString', () => {
		it('should return true for valid Error syntax', () => {
			expect(service.isString({ value: 'new Error("message")' })).toBe(true)
			expect(service.isString({ value: "new Error('message')" })).toBe(true)
			expect(service.isString({ value: 'new Error(`message`)' })).toBe(true)
			expect(service.isString({ value: 'new Error("msg", { name: "Custom" })' })).toBe(true)
		})

		it('should return false for invalid Error syntax', () => {
			expect(service.isString({ value: 'Error("message")' })).toBe(false)
			expect(service.isString({ value: 'new Error()' })).toBe(false)
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

		describe('_isErrorPatternMatch', () => {
			it('should return true for valid error patterns', () => {
				expect(
					(service as unknown as { _isErrorPatternMatch: (v: string) => boolean })._isErrorPatternMatch('new Error("test")')
				).toBe(true)
				expect(
					(service as unknown as { _isErrorPatternMatch: (v: string) => boolean })._isErrorPatternMatch("new Error('test')")
				).toBe(true)
			})

			it('should return false for invalid error patterns', () => {
				expect(
					(service as unknown as { _isErrorPatternMatch: (v: string) => boolean })._isErrorPatternMatch('Error("test")')
				).toBe(false)
				expect((service as unknown as { _isErrorPatternMatch: (v: string) => boolean })._isErrorPatternMatch('new Error()')).toBe(
					false
				)
			})
		})

		describe('_extractErrorNameFromOptions', () => {
			it('should extract name from options string', () => {
				expect(
					(
						service as unknown as { _extractErrorNameFromOptions: (s: string) => string | undefined }
					)._extractErrorNameFromOptions('{ name: "CustomError" }')
				).toBe('CustomError')
				expect(
					(
						service as unknown as { _extractErrorNameFromOptions: (s: string) => string | undefined }
					)._extractErrorNameFromOptions("{ name: 'MyError' }")
				).toBe('MyError')
			})

			it('should return undefined for invalid options string', () => {
				expect(
					(
						service as unknown as { _extractErrorNameFromOptions: (s: string) => string | undefined }
					)._extractErrorNameFromOptions('{ }')
				).toBeUndefined()
			})
		})
	})
})
