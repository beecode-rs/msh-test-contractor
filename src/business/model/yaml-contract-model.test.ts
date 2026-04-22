import { describe, expect, it } from 'vitest'

import {
	type YamlContractFunction,
	type YamlContractModel,
	YamlContractModelValidator,
	type YamlContractTerm,
} from '#src/business/model/yaml-contract-model.js'

const validator = new YamlContractModelValidator()

describe('yaml-contract-model', () => {
	describe('isYamlContractTerm', () => {
		describe('valid structures', () => {
			it('should return true for minimal valid term with result', () => {
				const term = { result: 'value' }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for minimal valid term with error', () => {
				const term = { error: 'something went wrong' }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with params array', () => {
				const term = { params: [1, 2, 3], result: 'value' }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with constructorParams array', () => {
				const term = { constructorParams: ['config'], result: 'value' }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with returnFnParams array', () => {
				const term = { result: 'value', returnFnParams: ['arg1', 'arg2'] }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with all fields', () => {
				const term: YamlContractTerm = {
					constructorParams: ['config'],
					error: undefined,
					params: [1, 'test'],
					result: { data: 'value' },
					returnFnParams: ['arg'],
				}
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with result and error both present', () => {
				const term = { error: 'also present', result: 'value' }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with empty params array', () => {
				const term = { params: [], result: 'value' }
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})

			it('should return true for term with complex result value', () => {
				const term = {
					result: { nested: { deep: [1, 2, 3] } },
				}
				expect(validator.isYamlContractTerm(term)).toBe(true)
			})
		})

		describe('invalid structures', () => {
			it('should throw for null value', () => {
				expect(() => validator.isYamlContractTerm(null)).toThrow('YamlContractTerm must be a non-null object')
			})

			it('should throw for undefined value', () => {
				expect(() => validator.isYamlContractTerm(undefined)).toThrow('YamlContractTerm must be a non-null object')
			})

			it('should throw for number value', () => {
				expect(() => validator.isYamlContractTerm(123)).toThrow('YamlContractTerm must be a non-null object')
			})

			it('should throw for string value', () => {
				expect(() => validator.isYamlContractTerm('string')).toThrow('YamlContractTerm must be a non-null object')
			})

			it('should throw for array value', () => {
				expect(() => validator.isYamlContractTerm([1, 2, 3])).toThrow(
					'YamlContractTerm must have either "result" or "error" field'
				)
			})

			it('should throw when params is not an array', () => {
				expect(() => validator.isYamlContractTerm({ params: 'not-array', result: 'value' })).toThrow(
					'YamlContractTerm.params must be an array'
				)
			})

			it('should throw when constructorParams is not an array', () => {
				expect(() => validator.isYamlContractTerm({ constructorParams: {}, result: 'value' })).toThrow(
					'YamlContractTerm.constructorParams must be an array'
				)
			})

			it('should throw when returnFnParams is not an array', () => {
				expect(() => validator.isYamlContractTerm({ result: 'value', returnFnParams: 'not-array' })).toThrow(
					'YamlContractTerm.returnFnParams must be an array'
				)
			})

			it('should throw when neither result nor error is present', () => {
				expect(() => validator.isYamlContractTerm({ params: [1, 2] })).toThrow(
					'YamlContractTerm must have either "result" or "error" field'
				)
			})

			it('should throw for empty object', () => {
				expect(() => validator.isYamlContractTerm({})).toThrow('YamlContractTerm must have either "result" or "error" field')
			})
		})
	})

	describe('isYamlContractFunction', () => {
		describe('valid structures', () => {
			it('should return true for function with single term', () => {
				const fn: YamlContractFunction = {
					terms: [{ result: 'value' }],
				}
				expect(validator.isYamlContractFunction(fn)).toBe(true)
			})

			it('should return true for function with multiple terms', () => {
				const fn: YamlContractFunction = {
					terms: [{ result: 'value1' }, { result: 'value2' }, { error: 'failed' }],
				}
				expect(validator.isYamlContractFunction(fn)).toBe(true)
			})

			it('should return true for function with empty terms array', () => {
				const fn: YamlContractFunction = {
					terms: [],
				}
				expect(validator.isYamlContractFunction(fn)).toBe(true)
			})

			it('should return true for function with complex terms', () => {
				const fn: YamlContractFunction = {
					terms: [
						{ params: [1, 2], result: 3 },
						{ params: ['a', 'b'], result: 'ab' },
						{ constructorParams: ['config'], params: [], result: 'configured' },
					],
				}
				expect(validator.isYamlContractFunction(fn)).toBe(true)
			})
		})

		describe('invalid structures', () => {
			it('should throw for null value', () => {
				expect(() => validator.isYamlContractFunction(null)).toThrow('YamlContractFunction must be a non-null object')
			})

			it('should throw for undefined value', () => {
				expect(() => validator.isYamlContractFunction(undefined)).toThrow('YamlContractFunction must be a non-null object')
			})

			it('should throw for number value', () => {
				expect(() => validator.isYamlContractFunction(123)).toThrow('YamlContractFunction must be a non-null object')
			})

			it('should throw for string value', () => {
				expect(() => validator.isYamlContractFunction('string')).toThrow('YamlContractFunction must be a non-null object')
			})

			it('should throw for array value', () => {
				expect(() => validator.isYamlContractFunction([])).toThrow('YamlContractFunction must have a "terms" field')
			})

			it('should throw when terms field is missing', () => {
				expect(() => validator.isYamlContractFunction({})).toThrow('YamlContractFunction must have a "terms" field')
			})

			it('should throw when terms is not an array', () => {
				expect(() => validator.isYamlContractFunction({ terms: 'not-array' })).toThrow(
					'YamlContractFunction.terms must be an array'
				)
			})

			it('should throw when terms contains invalid term', () => {
				expect(() => validator.isYamlContractFunction({ terms: [{ invalid: 'term' }] })).toThrow(
					'YamlContractFunction.terms[0] is invalid: YamlContractTerm must have either "result" or "error" field'
				)
			})

			it('should throw with index information for nested validation error', () => {
				expect(() =>
					validator.isYamlContractFunction({
						terms: [{ result: 'valid' }, { params: 'invalid' }],
					})
				).toThrow('YamlContractFunction.terms[1] is invalid: YamlContractTerm.params must be an array')
			})
		})
	})

	describe('function-level mock field', () => {
		it('should return true for function with valid mock array', () => {
			expect(
				validator.isYamlContractFunction({
					mock: ['./dep.contract.yaml'],
					terms: [{ result: 'value' }],
				})
			).toBe(true)
		})

		it('should return true for function with multiple mock paths', () => {
			expect(
				validator.isYamlContractFunction({
					mock: ['./dep1.contract.yaml', './dep2.contract.yaml'],
					terms: [{ result: 'value' }],
				})
			).toBe(true)
		})

		it('should return true for function without mock field', () => {
			expect(
				validator.isYamlContractFunction({
					terms: [{ result: 'value' }],
				})
			).toBe(true)
		})

		it('should throw when mock is not an array', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mock: 'not-array',
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mock must be an array')
		})

		it('should throw when mock contains non-string', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mock: [123],
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mock[0] must be a non-empty string')
		})

		it('should throw when mock contains empty string', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mock: [''],
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mock[0] must be a non-empty string')
		})

		it('should throw when mock contains whitespace-only string', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mock: ['   '],
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mock[0] must be a non-empty string')
		})
	})

	describe('function-level mockFunction field', () => {
		it('should return true for function with valid mockFunction array', () => {
			expect(
				validator.isYamlContractFunction({
					mockFunction: ['_message'],
					terms: [{ result: 'value' }],
				})
			).toBe(true)
		})

		it('should return true for function with multiple mockFunction names', () => {
			expect(
				validator.isYamlContractFunction({
					mockFunction: ['helper1', 'helper2'],
					terms: [{ result: 'value' }],
				})
			).toBe(true)
		})

		it('should return true for function without mockFunction field', () => {
			expect(
				validator.isYamlContractFunction({
					terms: [{ result: 'value' }],
				})
			).toBe(true)
		})

		it('should throw when mockFunction is not an array', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mockFunction: 'not-array',
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mockFunction must be an array')
		})

		it('should throw when mockFunction contains non-string', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mockFunction: [123],
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mockFunction[0] must be a non-empty string')
		})

		it('should throw when mockFunction contains empty string', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mockFunction: [''],
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mockFunction[0] must be a non-empty string')
		})

		it('should throw when mockFunction contains whitespace-only string', () => {
			expect(() =>
				validator.isYamlContractFunction({
					mockFunction: ['   '],
					terms: [{ result: 'value' }],
				})
			).toThrow('YamlContractFunction.mockFunction[0] must be a non-empty string')
		})
	})

	describe('isYamlContractModel', () => {
		describe('valid structures', () => {
			it('should return true for minimal valid model with function subjectType', () => {
				const model: YamlContractModel = {
					fns: {
						myFunction: {
							terms: [{ result: 'value' }],
						},
					},
					module: './my-module',
					subjectName: 'myFunction',
					subjectType: 'function',
				}
				expect(validator.isYamlContractModel(model)).toBe(true)
			})

			it('should return true for minimal valid model with class subjectType', () => {
				const model: YamlContractModel = {
					fns: {
						method: {
							terms: [{ params: [], result: 'value' }],
						},
					},
					module: './my-module',
					subjectName: 'MyClass',
					subjectType: 'class',
				}
				expect(validator.isYamlContractModel(model)).toBe(true)
			})

			it('should return true for model with multiple functions', () => {
				const model: YamlContractModel = {
					fns: {
						method1: {
							terms: [{ result: 'value1' }],
						},
						method2: {
							terms: [{ result: 'value2' }],
						},
						method3: {
							terms: [{ error: 'error' }],
						},
					},
					module: './my-module',
					subjectName: 'MyClass',
					subjectType: 'class',
				}
				expect(validator.isYamlContractModel(model)).toBe(true)
			})

			it('should return true for model with empty fns object', () => {
				const model: YamlContractModel = {
					fns: {},
					module: './my-module',
					subjectName: 'MyClass',
					subjectType: 'class',
				}
				expect(validator.isYamlContractModel(model)).toBe(true)
			})

			it('should return true for model with complex function terms', () => {
				const model: YamlContractModel = {
					fns: {
						add: {
							terms: [
								{ params: [1, 2], result: 3 },
								{ params: [5, 3], result: 8 },
							],
						},
						subtract: {
							terms: [{ params: [10, 4], result: 6 }],
						},
					},
					module: './calculator',
					subjectName: 'Calculator',
					subjectType: 'class',
				}
				expect(validator.isYamlContractModel(model)).toBe(true)
			})
		})

		describe('invalid structures', () => {
			it('should throw for null value', () => {
				expect(() => validator.isYamlContractModel(null)).toThrow('YamlContractModel must be a non-null object')
			})

			it('should throw for undefined value', () => {
				expect(() => validator.isYamlContractModel(undefined)).toThrow('YamlContractModel must be a non-null object')
			})

			it('should throw for number value', () => {
				expect(() => validator.isYamlContractModel(123)).toThrow('YamlContractModel must be a non-null object')
			})

			it('should throw for string value', () => {
				expect(() => validator.isYamlContractModel('string')).toThrow('YamlContractModel must be a non-null object')
			})

			it('should throw for array value', () => {
				expect(() => validator.isYamlContractModel([])).toThrow('YamlContractModel must have a "subjectName" field')
			})

			it('should throw when subjectName field is missing', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel must have a "subjectName" field')
			})

			it('should throw when subjectName is not a string', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectName: 123,
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.subjectName must be a string')
			})

			it('should throw when subjectName is empty string', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectName: '',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.subjectName must be a non-empty string')
			})

			it('should throw when subjectName is whitespace only', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectName: '   ',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.subjectName must be a non-empty string')
			})

			it('should throw when subjectType field is missing', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectName: 'myFunction',
					})
				).toThrow('YamlContractModel must have a "subjectType" field')
			})

			it('should throw when subjectType is not function or class', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectName: 'myFunction',
						subjectType: 'invalid',
					})
				).toThrow('YamlContractModel.subjectType must be "function" or "class"')
			})

			it('should throw when subjectType is a number', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: './module',
						subjectName: 'myFunction',
						subjectType: 123,
					})
				).toThrow('YamlContractModel.subjectType must be "function" or "class"')
			})

			it('should throw when module field is missing', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel must have a "module" field')
			})

			it('should throw when module is not a string', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: { path: './module' },
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.module must be a string')
			})

			it('should throw when module is empty string', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: '',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.module must be a non-empty string')
			})

			it('should throw when module is whitespace only', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {},
						module: '   ',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.module must be a non-empty string')
			})

			it('should throw when fns field is missing', () => {
				expect(() =>
					validator.isYamlContractModel({
						module: './module',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel must have a "fns" field')
			})

			it('should throw when fns is null', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: null,
						module: './module',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.fns must be an object')
			})

			it('should not throw when fns is an empty array (arrays are objects in JS)', () => {
				const result = validator.isYamlContractModel({
					fns: [],
					module: './module',
					subjectName: 'myFunction',
					subjectType: 'function',
				})
				expect(result).toBe(true)
			})

			it('should throw when fns is a string', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: 'invalid',
						module: './module',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.fns must be an object')
			})

			it('should throw with key information for invalid function in fns', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {
							myFunction: {
								terms: 'invalid',
							},
						},
						module: './module',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow('YamlContractModel.fns["myFunction"] is invalid: YamlContractFunction.terms must be an array')
			})

			it('should throw with key information for function with invalid term', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {
							myFunction: {
								terms: [{ invalid: 'term' }],
							},
						},
						module: './module',
						subjectName: 'myFunction',
						subjectType: 'function',
					})
				).toThrow(
					'YamlContractModel.fns["myFunction"] is invalid: YamlContractFunction.terms[0] is invalid: YamlContractTerm must have either "result" or "error" field'
				)
			})

			it('should throw for first invalid function when multiple functions present', () => {
				expect(() =>
					validator.isYamlContractModel({
						fns: {
							invalidMethod: {
								terms: {},
							},
							validMethod: {
								terms: [{ result: 'valid' }],
							},
						},
						module: './module',
						subjectName: 'MyClass',
						subjectType: 'class',
					})
				).toThrow('YamlContractModel.fns["invalidMethod"] is invalid: YamlContractFunction.terms must be an array')
			})
		})
	})

	describe('error message quality', () => {
		it('should provide descriptive error for deeply nested invalid structure', () => {
			expect(() =>
				validator.isYamlContractModel({
					fns: {
						method: {
							terms: [{ params: 'not-an-array', result: 'test' }],
						},
					},
					module: './test',
					subjectName: 'Test',
					subjectType: 'class',
				})
			).toThrow(
				'YamlContractModel.fns["method"] is invalid: YamlContractFunction.terms[0] is invalid: YamlContractTerm.params must be an array'
			)
		})

		it('should provide clear error for missing required field', () => {
			expect(() => validator.isYamlContractTerm({})).toThrow('YamlContractTerm must have either "result" or "error" field')
		})

		it('should provide clear error for wrong type', () => {
			expect(() => validator.isYamlContractTerm({ params: 'wrong', result: 'test' })).toThrow(
				'YamlContractTerm.params must be an array'
			)
		})
	})
})
