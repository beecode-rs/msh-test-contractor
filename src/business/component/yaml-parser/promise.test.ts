import { describe, expect, it } from 'vitest'

import { YamlParserError } from '#src/business/component/yaml-parser/error.js'
import { YamlParserPromise } from '#src/business/component/yaml-parser/promise.js'

describe('promise', () => {
	const service = new YamlParserPromise(new YamlParserError())

	describe('parseResolve', () => {
		describe('basic promise resolve parsing', () => {
			it('should parse Promise.resolve({ id: 1 })', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve({ id: 1 })' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toEqual({ id: 1 })
			})

			it('should parse Promise.resolve with array', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve([1, 2, 3])' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toEqual([1, 2, 3])
			})

			it('should parse Promise.resolve with string', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve("success")' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBe('success')
			})

			it('should parse Promise.resolve with number', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve(42)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBe(42)
			})

			it('should parse Promise.resolve with boolean', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve(true)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBe(true)
			})

			it('should parse Promise.resolve with null', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve(null)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBeNull()
			})

			it('should parse Promise.resolve with undefined', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve(undefined)' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBeUndefined()
			})

			it('should parse Promise.resolve() with empty value', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve()' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toBeUndefined()
			})

			it('should parse Promise.resolve with complex object', async () => {
				const result = service.parseResolve({ value: 'Promise.resolve({ id: 1, name: "test", active: true })' })

				expect(result).toBeInstanceOf(Promise)
				const value = await result
				expect(value).toEqual({ active: true, id: 1, name: 'test' })
			})
		})

		describe('invalid syntax handling', () => {
			it('should return undefined for non-string values', () => {
				expect(service.parseResolve({ value: null })).toBeUndefined()
				expect(service.parseResolve({ value: undefined })).toBeUndefined()
				expect(service.parseResolve({ value: 123 })).toBeUndefined()
				expect(service.parseResolve({ value: {} })).toBeUndefined()
			})

			it('should return undefined for invalid promise syntax', () => {
				expect(service.parseResolve({ value: 'Promise.resolve' })).toBeUndefined()
				expect(service.parseResolve({ value: 'resolve({ id: 1 })' })).toBeUndefined()
				expect(service.parseResolve({ value: 'just a string' })).toBeUndefined()
			})
		})
	})

	describe('parseReject', () => {
		describe('basic promise reject parsing', () => {
			it('should parse Promise.reject(new Error("failed"))', async () => {
				const result = service.parseReject({ value: 'Promise.reject(new Error("failed"))' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toThrow('failed')
			})

			it('should parse Promise.reject with string reason', async () => {
				const result = service.parseReject({ value: 'Promise.reject("error reason")' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toThrow('error reason')
			})

			it('should parse Promise.reject with object', async () => {
				const result = service.parseReject({ value: 'Promise.reject({ code: 500 })' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toThrow('[object Object]')
			})

			it('should parse Promise.reject with null', async () => {
				const result = service.parseReject({ value: 'Promise.reject(null)' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toThrow('null')
			})
		})

		describe('nested error parsing', () => {
			it('should correctly parse nested Error with custom name', async () => {
				const result = service.parseReject({
					value: 'Promise.reject(new Error("Not found", { name: "NotFoundError" }))',
				})

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toMatchObject({
					message: 'Not found',
					name: 'NotFoundError',
				})
			})

			it('should correctly parse nested Error with empty message', async () => {
				const result = service.parseReject({ value: 'Promise.reject(new Error(""))' })

				expect(result).toBeInstanceOf(Promise)
				await expect(result).rejects.toMatchObject({
					message: '',
				})
			})
		})

		describe('invalid syntax handling', () => {
			it('should return undefined for non-string values', () => {
				expect(service.parseReject({ value: null })).toBeUndefined()
				expect(service.parseReject({ value: undefined })).toBeUndefined()
				expect(service.parseReject({ value: 123 })).toBeUndefined()
				expect(service.parseReject({ value: {} })).toBeUndefined()
			})

			it('should return undefined for invalid promise syntax', () => {
				expect(service.parseReject({ value: 'Promise.reject' })).toBeUndefined()
				expect(service.parseReject({ value: 'reject("error")' })).toBeUndefined()
				expect(service.parseReject({ value: 'just a string' })).toBeUndefined()
			})
		})
	})

	describe('parse', () => {
		it('should parse Promise.resolve syntax', async () => {
			const result = service.parse({ value: 'Promise.resolve({ id: 1 })' })

			expect(result).toBeInstanceOf(Promise)
			const value = await result
			expect(value).toEqual({ id: 1 })
		})

		it('should parse Promise.reject syntax', async () => {
			const result = service.parse({ value: 'Promise.reject(new Error("failed"))' })

			expect(result).toBeInstanceOf(Promise)
			await expect(result).rejects.toThrow('failed')
		})

		it('should return undefined for non-promise strings', () => {
			expect(service.parse({ value: 'new Error("test")' })).toBeUndefined()
			expect(service.parse({ value: 'just a string' })).toBeUndefined()
			expect(service.parse({ value: null })).toBeUndefined()
		})
	})

	describe('isResolveString', () => {
		it('should return true for valid Promise.resolve syntax', () => {
			expect(service.isResolveString({ value: 'Promise.resolve({ id: 1 })' })).toBe(true)
			expect(service.isResolveString({ value: 'Promise.resolve("success")' })).toBe(true)
			expect(service.isResolveString({ value: 'Promise.resolve(42)' })).toBe(true)
			expect(service.isResolveString({ value: 'Promise.resolve(null)' })).toBe(true)
			expect(service.isResolveString({ value: 'Promise.resolve()' })).toBe(true)
		})

		it('should return false for Promise.reject syntax', () => {
			expect(service.isResolveString({ value: 'Promise.reject("error")' })).toBe(false)
		})

		it('should return false for invalid syntax', () => {
			expect(service.isResolveString({ value: 'resolve({ id: 1 })' })).toBe(false)
			expect(service.isResolveString({ value: 'just a string' })).toBe(false)
			expect(service.isResolveString({ value: null })).toBe(false)
			expect(service.isResolveString({ value: 123 })).toBe(false)
		})
	})

	describe('isRejectString', () => {
		it('should return true for valid Promise.reject syntax', () => {
			expect(service.isRejectString({ value: 'Promise.reject(new Error("failed"))' })).toBe(true)
			expect(service.isRejectString({ value: 'Promise.reject("error")' })).toBe(true)
			expect(service.isRejectString({ value: 'Promise.reject({ code: 500 })' })).toBe(true)
			expect(service.isRejectString({ value: 'Promise.reject(null)' })).toBe(true)
		})

		it('should return false for Promise.resolve syntax', () => {
			expect(service.isRejectString({ value: 'Promise.resolve(42)' })).toBe(false)
		})

		it('should return false for invalid syntax', () => {
			expect(service.isRejectString({ value: 'reject("error")' })).toBe(false)
			expect(service.isRejectString({ value: 'just a string' })).toBe(false)
			expect(service.isRejectString({ value: null })).toBe(false)
			expect(service.isRejectString({ value: 123 })).toBe(false)
		})
	})

	describe('isString', () => {
		it('should return true for any valid Promise syntax', () => {
			expect(service.isString({ value: 'Promise.resolve(42)' })).toBe(true)
			expect(service.isString({ value: 'Promise.reject("error")' })).toBe(true)
		})

		it('should return false for non-promise strings', () => {
			expect(service.isString({ value: 'new Error("test")' })).toBe(false)
			expect(service.isString({ value: 'just a string' })).toBe(false)
			expect(service.isString({ value: null })).toBe(false)
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

		describe('_isEmptyOrUndefined', () => {
			it('should return true for empty or undefined strings', () => {
				expect((service as unknown as { _isEmptyOrUndefined: (v: string) => boolean })._isEmptyOrUndefined('')).toBe(true)
				expect((service as unknown as { _isEmptyOrUndefined: (v: string) => boolean })._isEmptyOrUndefined('undefined')).toBe(
					true
				)
			})

			it('should return false for other strings', () => {
				expect((service as unknown as { _isEmptyOrUndefined: (v: string) => boolean })._isEmptyOrUndefined('test')).toBe(false)
				expect((service as unknown as { _isEmptyOrUndefined: (v: string) => boolean })._isEmptyOrUndefined('null')).toBe(false)
			})
		})

		describe('_isNullLiteral', () => {
			it('should return true for null literal', () => {
				expect((service as unknown as { _isNullLiteral: (v: string) => boolean })._isNullLiteral('null')).toBe(true)
			})

			it('should return false for other strings', () => {
				expect((service as unknown as { _isNullLiteral: (v: string) => boolean })._isNullLiteral('undefined')).toBe(false)
				expect((service as unknown as { _isNullLiteral: (v: string) => boolean })._isNullLiteral('test')).toBe(false)
			})
		})

		describe('_isBooleanLiteral', () => {
			it('should return true for boolean literals', () => {
				expect((service as unknown as { _isBooleanLiteral: (v: string) => boolean })._isBooleanLiteral('true')).toBe(true)
				expect((service as unknown as { _isBooleanLiteral: (v: string) => boolean })._isBooleanLiteral('false')).toBe(true)
			})

			it('should return false for other strings', () => {
				expect((service as unknown as { _isBooleanLiteral: (v: string) => boolean })._isBooleanLiteral('test')).toBe(false)
				expect((service as unknown as { _isBooleanLiteral: (v: string) => boolean })._isBooleanLiteral('1')).toBe(false)
			})
		})

		describe('_isNumericValue', () => {
			it('should return true for numeric strings', () => {
				expect((service as unknown as { _isNumericValue: (v: string) => boolean })._isNumericValue('123')).toBe(true)
				expect((service as unknown as { _isNumericValue: (v: string) => boolean })._isNumericValue('123.45')).toBe(true)
				expect((service as unknown as { _isNumericValue: (v: string) => boolean })._isNumericValue('-42')).toBe(true)
			})

			it('should return false for non-numeric strings', () => {
				expect((service as unknown as { _isNumericValue: (v: string) => boolean })._isNumericValue('test')).toBe(false)
				expect((service as unknown as { _isNumericValue: (v: string) => boolean })._isNumericValue('12abc')).toBe(false)
			})
		})

		describe('_convertToRejectionError', () => {
			it('should return Error as-is', () => {
				const error = new Error('test')
				expect((service as unknown as { _convertToRejectionError: (v: unknown) => Error })._convertToRejectionError(error)).toBe(
					error
				)
			})

			it('should wrap non-Error values in Error', () => {
				const result = (service as unknown as { _convertToRejectionError: (v: unknown) => Error })._convertToRejectionError(
					'string value'
				)
				expect(result).toBeInstanceOf(Error)
				expect(result.message).toBe('string value')
			})
		})
	})
})
