import { describe, expect, it } from 'vitest'

import { YamlParserDate } from '#src/business/component/yaml-parser/date.js'

describe('date', () => {
	const service = new YamlParserDate()

	describe('parse', () => {
		describe('basic date parsing', () => {
			it('should parse new Date("2024-01-15") with double quotes', () => {
				const result = service.parse({ value: 'new Date("2024-01-15")' })

				expect(result).toBeInstanceOf(Date)
				expect(result?.getFullYear()).toBe(2024)
				expect(result?.getMonth()).toBe(0)
				expect(result?.getDate()).toBe(15)
			})

			it('should parse new Date("2024-01-15") with single quotes', () => {
				const result = service.parse({ value: "new Date('2024-01-15')" })

				expect(result).toBeInstanceOf(Date)
				expect(result?.getFullYear()).toBe(2024)
				expect(result?.getMonth()).toBe(0)
				expect(result?.getDate()).toBe(15)
			})

			it('should parse new Date("2024-01-15") with backticks', () => {
				const result = service.parse({ value: 'new Date(`2024-01-15`)' })

				expect(result).toBeInstanceOf(Date)
				expect(result?.getFullYear()).toBe(2024)
				expect(result?.getMonth()).toBe(0)
				expect(result?.getDate()).toBe(15)
			})
		})

		describe('ISO timestamp parsing', () => {
			it('should parse ISO timestamp with Z timezone', () => {
				const result = service.parse({ value: 'new Date("2024-01-15T10:30:00Z")' })

				expect(result).toBeInstanceOf(Date)
				expect(result?.getUTCFullYear()).toBe(2024)
				expect(result?.getUTCMonth()).toBe(0)
				expect(result?.getUTCDate()).toBe(15)
				expect(result?.getUTCHours()).toBe(10)
				expect(result?.getUTCMinutes()).toBe(30)
			})

			it('should parse ISO timestamp with timezone offset', () => {
				const result = service.parse({ value: 'new Date("2024-01-15T10:30:00+05:00")' })

				expect(result).toBeInstanceOf(Date)
				expect(result).not.toBeNull()
			})

			it('should parse ISO timestamp with milliseconds', () => {
				const result = service.parse({ value: 'new Date("2024-01-15T10:30:00.123Z")' })

				expect(result).toBeInstanceOf(Date)
				expect(result?.getUTCMilliseconds()).toBe(123)
			})
		})

		describe('date properties preservation', () => {
			it('should preserve year', () => {
				const result = service.parse({ value: 'new Date("2024-06-20")' })

				expect(result?.getFullYear()).toBe(2024)
			})

			it('should preserve month', () => {
				const result = service.parse({ value: 'new Date("2024-06-20")' })

				expect(result?.getMonth()).toBe(5)
			})

			it('should preserve day', () => {
				const result = service.parse({ value: 'new Date("2024-06-20")' })

				expect(result?.getDate()).toBe(20)
			})

			it('should have valid getTime()', () => {
				const result = service.parse({ value: 'new Date("2024-01-15")' })

				expect(result?.getTime()).toBeDefined()
				expect(typeof result?.getTime()).toBe('number')
				expect(Number.isNaN(result?.getTime())).toBe(false)
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

			it('should return undefined for invalid date syntax', () => {
				expect(service.parse({ value: 'Date("2024-01-15")' })).toBeUndefined()
				expect(service.parse({ value: 'new Date()' })).toBeUndefined()
				expect(service.parse({ value: 'new Date(2024-01-15)' })).toBeUndefined()
				expect(service.parse({ value: 'just a string' })).toBeUndefined()
				expect(service.parse({ value: 'new Date' })).toBeUndefined()
			})

			it('should return undefined for malformed quotes', () => {
				expect(service.parse({ value: 'new Date("2024-01-15\')' })).toBeUndefined()
				expect(service.parse({ value: 'new Date(2024-01-15)' })).toBeUndefined()
			})

			it('should return undefined for invalid date strings', () => {
				expect(service.parse({ value: 'new Date("invalid-date")' })).toBeUndefined()
				expect(service.parse({ value: 'new Date("2024-13-45")' })).toBeUndefined()
				expect(service.parse({ value: 'new Date("not-a-date")' })).toBeUndefined()
			})
		})
	})

	describe('isString', () => {
		it('should return true for valid Date syntax', () => {
			expect(service.isString({ value: 'new Date("2024-01-15")' })).toBe(true)
			expect(service.isString({ value: "new Date('2024-01-15')" })).toBe(true)
			expect(service.isString({ value: 'new Date(`2024-01-15`)' })).toBe(true)
			expect(service.isString({ value: 'new Date("2024-01-15T10:30:00Z")' })).toBe(true)
		})

		it('should return false for invalid Date syntax', () => {
			expect(service.isString({ value: 'Date("2024-01-15")' })).toBe(false)
			expect(service.isString({ value: 'new Date()' })).toBe(false)
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
				expect((service as unknown as { _isStringValue: (v: unknown) => boolean })._isStringValue(undefined)).toBe(false)
			})
		})

		describe('_isDatePatternMatch', () => {
			it('should return true for valid date patterns', () => {
				expect(
					(service as unknown as { _isDatePatternMatch: (v: string) => boolean })._isDatePatternMatch('new Date("2024-01-15")')
				).toBe(true)
				expect(
					(service as unknown as { _isDatePatternMatch: (v: string) => boolean })._isDatePatternMatch("new Date('2024-01-15')")
				).toBe(true)
			})

			it('should return false for invalid date patterns', () => {
				expect(
					(service as unknown as { _isDatePatternMatch: (v: string) => boolean })._isDatePatternMatch('Date("2024-01-15")')
				).toBe(false)
				expect((service as unknown as { _isDatePatternMatch: (v: string) => boolean })._isDatePatternMatch('new Date()')).toBe(
					false
				)
			})
		})

		describe('_isValidDate', () => {
			it('should return true for valid dates', () => {
				expect((service as unknown as { _isValidDate: (d: Date) => boolean })._isValidDate(new Date('2024-01-15'))).toBe(true)
			})

			it('should return false for invalid dates', () => {
				expect((service as unknown as { _isValidDate: (d: Date) => boolean })._isValidDate(new Date('invalid'))).toBe(false)
			})
		})
	})
})
