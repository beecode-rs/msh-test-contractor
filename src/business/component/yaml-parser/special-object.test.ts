import { describe, expect, it } from 'vitest'

import { YamlParserDate } from '#src/business/component/yaml-parser/date.js'
import { YamlParserError } from '#src/business/component/yaml-parser/error.js'
import { YamlParserPromise } from '#src/business/component/yaml-parser/promise.js'
import { YamlParserRegex } from '#src/business/component/yaml-parser/regex.js'
import { YamlParserSpecialObject } from '#src/business/component/yaml-parser/special-object.js'

describe('special-object', () => {
	const yamlParserError = new YamlParserError()
	const yamlParserDate = new YamlParserDate()
	const yamlParserRegex = new YamlParserRegex()
	const yamlParserPromise = new YamlParserPromise(yamlParserError)
	const service = new YamlParserSpecialObject(yamlParserError, yamlParserPromise, yamlParserDate, yamlParserRegex)

	describe('parse', () => {
		describe('error parsing', () => {
			it('parses new Error("msg") and returns Error object', () => {
				const result = service.parse({ value: 'new Error("Something went wrong")' })

				expect(result).toBeInstanceOf(Error)
				if (result instanceof Error) {
					expect(result.message).toBe('Something went wrong')
					expect(result.name).toBe('Error')
				}
			})

			it('parses new Error with single quotes', () => {
				const result = service.parse({ value: "new Error('test error')" })

				expect(result).toBeInstanceOf(Error)
				if (result instanceof Error) {
					expect(result.message).toBe('test error')
				}
			})

			it('parses new Error with custom name', () => {
				const result = service.parse({ value: 'new Error("Not found", { name: "NotFoundError" })' })

				expect(result).toBeInstanceOf(Error)
				if (result instanceof Error) {
					expect(result.message).toBe('Not found')
					expect(result.name).toBe('NotFoundError')
				}
			})

			it('parses new Error with empty message', () => {
				const result = service.parse({ value: 'new Error("")' })

				expect(result).toBeInstanceOf(Error)
				if (result instanceof Error) {
					expect(result.message).toBe('')
				}
			})
		})

		describe('promise parsing', () => {
			it('parses Promise.resolve(1) and returns resolved Promise', async () => {
				const result = service.parse({ value: 'Promise.resolve(1)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBe(1)
			})

			it('parses Promise.resolve with object value', async () => {
				const result = service.parse({ value: 'Promise.resolve({ id: 1, name: "test" })' })

				expect(result).toBeInstanceOf(Promise)
				const value = (await result) as { id: number; name: string }
				expect(value).toEqual({ id: 1, name: 'test' })
			})

			it('parses Promise.resolve with string value', async () => {
				const result = service.parse({ value: 'Promise.resolve("success")' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBe('success')
			})

			it('parses Promise.reject(new Error("failed")) and returns rejected Promise', async () => {
				const result = service.parse({ value: 'Promise.reject(new Error("Operation failed"))' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toThrow('Operation failed')
			})

			it('parses Promise.reject with string value', async () => {
				const result = service.parse({ value: 'Promise.reject("error reason")' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toThrow('error reason')
			})

			it('parses Promise.resolve with null', async () => {
				const result = service.parse({ value: 'Promise.resolve(null)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBeNull()
			})

			it('parses Promise.resolve with undefined', async () => {
				const result = service.parse({ value: 'Promise.resolve(undefined)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBeUndefined()
			})
		})

		describe('date parsing', () => {
			it('parses new Date("2024-01-15") and returns Date object', () => {
				const result = service.parse({ value: 'new Date("2024-01-15")' })

				expect(result).toBeInstanceOf(Date)
				if (result instanceof Date) {
					expect(result.getFullYear()).toBe(2024)
					expect(result.getMonth()).toBe(0)
					expect(result.getDate()).toBe(15)
				}
			})

			it('parses new Date with ISO timestamp', () => {
				const result = service.parse({ value: 'new Date("2024-01-15T10:30:00Z")' })

				expect(result).toBeInstanceOf(Date)
				if (result instanceof Date) {
					expect(result.getUTCFullYear()).toBe(2024)
					expect(result.getUTCMonth()).toBe(0)
					expect(result.getUTCDate()).toBe(15)
					expect(result.getUTCHours()).toBe(10)
					expect(result.getUTCMinutes()).toBe(30)
				}
			})

			it('parses new Date with single quotes', () => {
				const result = service.parse({ value: "new Date('2024-06-20')" })

				expect(result).toBeInstanceOf(Date)
				if (result instanceof Date) {
					expect(result.getFullYear()).toBe(2024)
					expect(result.getMonth()).toBe(5)
				}
			})
		})

		describe('regex parsing', () => {
			it('parses new RegExp("^[a-z]+$") and returns RegExp object', () => {
				const result = service.parse({ value: 'new RegExp("^[a-z]+$")' })

				expect(result).toBeInstanceOf(RegExp)
				if (result instanceof RegExp) {
					expect(result.source).toBe('^[a-z]+$')
					expect(result.flags).toBe('')
					expect(result.test('hello')).toBe(true)
					expect(result.test('Hello')).toBe(false)
				}
			})

			it('parses new RegExp with flags', () => {
				const result = service.parse({ value: 'new RegExp("^[a-z]+$", "gi")' })

				expect(result).toBeInstanceOf(RegExp)
				if (result instanceof RegExp) {
					expect(result.source).toBe('^[a-z]+$')
					expect(result.flags).toBe('gi')
					expect(result.test('Hello')).toBe(true)
				}
			})

			it('parses new RegExp with single quotes', () => {
				const result = service.parse({ value: "new RegExp('^test$', 'i')" })

				expect(result).toBeInstanceOf(RegExp)
				if (result instanceof RegExp) {
					expect(result.source).toBe('^test$')
					expect(result.flags).toBe('i')
				}
			})
		})

		describe('regular values pass through unchanged', () => {
			it('returns regular string unchanged', () => {
				expect(service.parse({ value: 'hello world' })).toBe('hello world')
			})

			it('returns number unchanged', () => {
				expect(service.parse({ value: 42 })).toBe(42)
			})

			it('returns boolean unchanged', () => {
				expect(service.parse({ value: true })).toBe(true)
				expect(service.parse({ value: false })).toBe(false)
			})

			it('returns null unchanged', () => {
				expect(service.parse({ value: null })).toBe(null)
			})

			it('returns undefined unchanged', () => {
				expect(service.parse({ value: undefined })).toBe(undefined)
			})

			it('returns object unchanged', () => {
				const obj = { id: 1, name: 'test' }
				expect(service.parse({ value: obj })).toBe(obj)
			})

			it('returns array unchanged', () => {
				const arr = [1, 2, 3]
				expect(service.parse({ value: arr })).toBe(arr)
			})

			it('returns string that looks like partial error syntax unchanged', () => {
				expect(service.parse({ value: 'Error("message")' })).toBe('Error("message")')
				expect(service.parse({ value: 'new Error' })).toBe('new Error')
			})

			it('returns string that starts with "new" but is not a special type unchanged', () => {
				expect(service.parse({ value: 'new MyClass()' })).toBe('new MyClass()')
			})
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
	})
})
