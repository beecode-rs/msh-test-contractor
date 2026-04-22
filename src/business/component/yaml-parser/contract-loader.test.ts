import { resolve } from 'node:path'
import { describe, expect, it, vi } from 'vitest'

import { YamlParserContractLoader } from '#src/business/component/yaml-parser/contract-loader.js'
import { mocker } from '#src/mocker/mocker.js'

describe('YamlParserContractLoader', () => {
	const loader = new YamlParserContractLoader()

	describe('createFromDefinition', () => {
		it('with function-type YAML contract produces valid Contract', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: ['a', 'b'], result: 'a/b' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/test.contract.yaml',
			})

			expect(result.subjectName).toBe('join')
			expect(result.module).toBeDefined()
			expect(result.fns).toHaveProperty('default')
			expect(result.fns.default?.terms).toHaveLength(1)
			expect(result.fns.default?.terms[0]?.params).toEqual(['a', 'b'])
			expect(result.fns.default?.terms[0]?.result).toBe('a/b')
		})

		it('with class-type YAML contract (has constructor) produces valid Contract', async () => {
			const definition = {
				fns: {
					CONSTRUCTOR: {
						terms: [{ params: ['initialValue'], result: undefined }],
					},
					doSomething: {
						terms: [{ params: ['input'], result: 'output' }],
					},
				},
				module: 'node:path',
				subjectName: 'MyClass',
				subjectType: 'class' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/class.contract.yaml',
			})

			expect(result.subjectName).toBe('MyClass')
			expect(result.fns).toHaveProperty('CONSTRUCTOR')
			expect(result.fns).toHaveProperty('doSomething')
			expect((result.fns as Record<string, { terms: unknown[] }>)['CONSTRUCTOR']?.terms).toHaveLength(1)
			expect(result.fns.doSomething?.terms).toHaveLength(1)
		})

		it('term with error field produces term with result containing Error instance', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ error: 'Something went wrong', params: [] }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/error.contract.yaml',
			})

			const term = result.fns.default?.terms[0]
			expect(term?.result).toBeInstanceOf(Error)
			if (term?.result instanceof Error) {
				expect(term.result.message).toBe('Something went wrong')
			}
		})

		it('term with error as Error instance passes through', async () => {
			const originalError = new Error('already parsed')
			const definition = {
				fns: {
					default: {
						terms: [{ error: originalError, params: [] }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/error-instance.contract.yaml',
			})

			const term = result.fns.default?.terms[0]
			expect(term?.result).toBe(originalError)
		})

		it('term with error object produces Error with correct name', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ error: { message: 'fail', name: 'TypeError' }, params: [] }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/error-obj.contract.yaml',
			})

			const term = result.fns.default?.terms[0]
			expect(term?.result).toBeInstanceOf(Error)
			if (term?.result instanceof Error) {
				expect(term.result.message).toBe('fail')
				expect(term.result.name).toBe('TypeError')
			}
		})

		it('term without params defaults to params: []', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ result: 'hello' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/no-params.contract.yaml',
			})

			expect(result.fns.default?.terms[0]?.params).toEqual([])
		})

		it('subjectType is used internally but not included in output Contract', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: [], result: 'test' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'class' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/subject-type.contract.yaml',
			})

			expect(result).not.toHaveProperty('subjectType')
			expect(result).toHaveProperty('module')
			expect(result).toHaveProperty('subjectName')
			expect(result).toHaveProperty('fns')
		})

		it('throws descriptive error for invalid module path', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: [], result: 'test' }],
					},
				},
				module: './non-existent-module-xyz-123.js',
				subjectName: 'missing',
				subjectType: 'function' as const,
			}

			await expect(
				loader.createFromDefinition({
					definition,
					modulePath: '/test/missing.contract.yaml',
				})
			).rejects.toThrow('Failed to resolve module "./non-existent-module-xyz-123.js"')
		})

		it('passes through constructorParams when present', async () => {
			const definition = {
				fns: {
					CONSTRUCTOR: {
						terms: [{ constructorParams: [10], params: [5], result: 15 }],
					},
				},
				module: 'node:path',
				subjectName: 'Counter',
				subjectType: 'class' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/ctor.contract.yaml',
			})

			const ctorFn = (result.fns as Record<string, { terms: { constructorParams?: unknown[] }[] }>)['CONSTRUCTOR']
			expect(ctorFn?.terms[0]?.constructorParams).toEqual([10])
		})

		it('passes through returnFnParams when present', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: [1], result: 'called', returnFnParams: [2, 3] }],
					},
				},
				module: 'node:path',
				subjectName: 'getCallback',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/callback.contract.yaml',
			})

			expect(result.fns.default?.terms[0]?.returnFnParams).toEqual([2, 3])
		})

		it('omits constructorParams and returnFnParams when undefined', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: [1], result: 'test' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/omit-optional.contract.yaml',
			})

			expect(result.fns.default?.terms[0]).not.toHaveProperty('constructorParams')
			expect(result.fns.default?.terms[0]).not.toHaveProperty('returnFnParams')
		})
	})

	describe('mock loading', () => {
		it('contract without mock field produces Contract with no mock', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: ['a', 'b'], result: 'a/b' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/no-mock.contract.yaml',
			})

			expect(result).not.toHaveProperty('mock')
		})

		it('contract with empty mock array produces Contract with no mock', async () => {
			const definition = {
				fns: {
					default: {
						terms: [{ params: ['a', 'b'], result: 'a/b' }],
					},
				},
				mock: [],
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/empty-mock.contract.yaml',
			})

			expect(result).not.toHaveProperty('mock')
		})

		it('loads referenced mock contract and creates working mock', async () => {
			const depDefinition = {
				fns: {
					default: {
						terms: [{ params: ['x', 'y'], result: 'x/y' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const mockRestore = vi.fn()
			vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockResolvedValue(depDefinition)
			vi.spyOn(mocker, 'contract').mockReturnValue({ mockRestore, spy: vi.fn() })

			const definition = {
				fns: {
					default: {
						terms: [{ params: ['a'], result: 'b' }],
					},
				},
				mock: ['./dep.contract.yaml'],
				module: 'node:path',
				subjectName: 'myFunc',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/main.contract.yaml',
			})

			expect(result).toHaveProperty('mock')
			expect(typeof result.mock).toBe('function')

			const restores = result.mock!()
			expect(Array.isArray(restores)).toBe(true)
			expect(restores).toHaveLength(1)
			expect(typeof restores[0]).toBe('function')

			restores[0]!()
			expect(mockRestore).toHaveBeenCalled()

			vi.restoreAllMocks()
		})

		it('circular reference throws descriptive error', async () => {
			const selfPath = '/test/circular.contract.yaml'
			const definition = {
				fns: {
					default: {
						terms: [{ params: [], result: 'test' }],
					},
				},
				mock: ['./circular.contract.yaml'],
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockResolvedValue(definition)

			await expect(
				loader.createFromDefinition({
					definition,
					modulePath: selfPath,
				})
			).rejects.toThrow(`Circular mock reference detected: ${resolve(selfPath)}`)

			vi.restoreAllMocks()
		})

		it('non-existent mock path throws descriptive error', async () => {
			vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockRejectedValue(
				new Error('YAML contract file not found: /test/missing.contract.yaml')
			)

			const definition = {
				fns: {
					default: {
						terms: [{ params: [], result: 'test' }],
					},
				},
				mock: ['./missing.contract.yaml'],
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			await expect(
				loader.createFromDefinition({
					definition,
					modulePath: '/test/main.contract.yaml',
				})
			).rejects.toThrow('Failed to load mock contract "./missing.contract.yaml"')

			vi.restoreAllMocks()
		})

		it('loads multiple mock contracts', async () => {
			const dep1Definition = {
				fns: {
					default: {
						terms: [{ params: ['a', 'b'], result: 'a/b' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}
			const dep2Definition = {
				fns: {
					default: {
						terms: [{ params: ['/a/b.txt'], result: 'b.txt' }],
					},
				},
				module: 'node:path',
				subjectName: 'basename',
				subjectType: 'function' as const,
			}

			const mockRestore1 = vi.fn()
			const mockRestore2 = vi.fn()
			const parseFileSpy = vi.spyOn(loader['_yamlParserContract'], 'parseFile')
			parseFileSpy.mockResolvedValueOnce(dep1Definition)
			parseFileSpy.mockResolvedValueOnce(dep2Definition)
			const mockerSpy = vi.spyOn(mocker, 'contract')
			mockerSpy.mockReturnValueOnce({ mockRestore: mockRestore1, spy: vi.fn() })
			mockerSpy.mockReturnValueOnce({ mockRestore: mockRestore2, spy: vi.fn() })

			const definition = {
				fns: {
					default: {
						terms: [{ params: [], result: 'ok' }],
					},
				},
				mock: ['./dep1.contract.yaml', './dep2.contract.yaml'],
				module: 'node:path',
				subjectName: 'myFunc',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/multi.contract.yaml',
			})

			const restores = result.mock!()
			expect(restores).toHaveLength(2)
			restores[0]!()
			restores[1]!()
			expect(mockRestore1).toHaveBeenCalled()
			expect(mockRestore2).toHaveBeenCalled()

			vi.restoreAllMocks()
		})

		it('referenced contract mocks are stripped to prevent deep recursion', async () => {
			const depDefinition = {
				fns: {
					default: {
						terms: [{ params: ['a', 'b'], result: 'a/b' }],
					},
				},
				mock: ['./other.contract.yaml'],
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const mockRestore = vi.fn()
			vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockResolvedValue(depDefinition)
			vi.spyOn(mocker, 'contract').mockReturnValue({ mockRestore, spy: vi.fn() })

			const definition = {
				fns: {
					default: {
						terms: [{ params: [], result: 'ok' }],
					},
				},
				mock: ['./dep.contract.yaml'],
				module: 'node:path',
				subjectName: 'myFunc',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/main.contract.yaml',
			})

			expect(result).toHaveProperty('mock')

			const restores = result.mock!()
			expect(restores).toHaveLength(1)
			restores[0]!()

			// parseFile should only be called once (for the dep), not for the dep's mock
			expect(loader['_yamlParserContract'].parseFile).toHaveBeenCalledTimes(1)

			vi.restoreAllMocks()
		})
	})

	describe('per-function mock loading', () => {
		it('loads mock for individual function', async () => {
			const depDefinition = {
				fns: {
					default: {
						terms: [{ params: ['x', 'y'], result: 'x/y' }],
					},
				},
				module: 'node:path',
				subjectName: 'join',
				subjectType: 'function' as const,
			}

			const mockRestore = vi.fn()
			vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockResolvedValue(depDefinition)
			vi.spyOn(mocker, 'contract').mockReturnValue({ mockRestore, spy: vi.fn() })

			const definition = {
				fns: {
					doWork: {
						mock: ['./dep.contract.yaml'],
						terms: [{ params: ['a'], result: 'b' }],
					},
					simple: {
						terms: [{ params: [], result: 'ok' }],
					},
				},
				module: 'node:path',
				subjectName: 'myFunc',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/main.contract.yaml',
			})

			expect(result.fns.doWork).toHaveProperty('mock')
			expect(typeof result.fns.doWork?.mock).toBe('function')
			expect(result.fns.simple).not.toHaveProperty('mock')

			const restores = result.fns.doWork?.mock!()
			expect(restores).toHaveLength(1)
			restores[0]!()
			expect(mockRestore).toHaveBeenCalled()

			vi.restoreAllMocks()
		})

		it('loads multiple mocks for individual function', async () => {
			const dep1Definition = {
				fns: { default: { terms: [{ params: ['a'], result: 'b' }] } },
				module: 'node:path',
				subjectName: 'fn1',
				subjectType: 'function' as const,
			}
			const dep2Definition = {
				fns: { default: { terms: [{ params: ['c'], result: 'd' }] } },
				module: 'node:path',
				subjectName: 'fn2',
				subjectType: 'function' as const,
			}

			const mockRestore1 = vi.fn()
			const mockRestore2 = vi.fn()
			const parseFileSpy = vi.spyOn(loader['_yamlParserContract'], 'parseFile')
			parseFileSpy.mockResolvedValueOnce(dep1Definition)
			parseFileSpy.mockResolvedValueOnce(dep2Definition)
			const mockerSpy = vi.spyOn(mocker, 'contract')
			mockerSpy.mockReturnValueOnce({ mockRestore: mockRestore1, spy: vi.fn() })
			mockerSpy.mockReturnValueOnce({ mockRestore: mockRestore2, spy: vi.fn() })

			const definition = {
				fns: {
					doWork: {
						mock: ['./dep1.contract.yaml', './dep2.contract.yaml'],
						terms: [{ params: [], result: 'ok' }],
					},
				},
				module: 'node:path',
				subjectName: 'myFunc',
				subjectType: 'function' as const,
			}

			const result = await loader.createFromDefinition({
				definition,
				modulePath: '/test/main.contract.yaml',
			})

			const restores = result.fns.doWork?.mock!()
			expect(restores).toHaveLength(2)
			restores[0]!()
			restores[1]!()
			expect(mockRestore1).toHaveBeenCalled()
			expect(mockRestore2).toHaveBeenCalled()

			vi.restoreAllMocks()
		})

		it('circular per-function mock reference throws error', async () => {
			const selfPath = '/test/circular.contract.yaml'
			const definition = {
				fns: {
					doWork: {
						mock: ['./circular.contract.yaml'],
						terms: [{ params: [], result: 'test' }],
					},
				},
				module: 'node:path',
				subjectName: 'myFunc',
				subjectType: 'function' as const,
			}

			vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockResolvedValue(definition)

			await expect(
				loader.createFromDefinition({
					definition,
					modulePath: selfPath,
				})
			).rejects.toThrow(`Circular mock reference detected: ${resolve(selfPath)}`)

			vi.restoreAllMocks()
		})

		describe('mockFunction (intra-contract)', () => {
			it('creates mocker.function mock for referenced function', async () => {
				const mockRestore = vi.fn()
				const mockerFunctionSpy = vi.spyOn(mocker, 'function').mockReturnValue({ mockRestore, spy: vi.fn() })

				const definition = {
					fns: {
						_message: {
							terms: [{ params: ['type', 'msg'], result: 'type:msg' }],
						},
						debug: {
							mockFunction: ['_message'],
							terms: [{ params: ['msg'], result: 'DEBUG:msg' }],
						},
					},
					module: 'node:path',
					subjectName: 'logger',
					subjectType: 'function' as const,
				}

				const result = await loader.createFromDefinition({
					definition,
					modulePath: '/test/logger.contract.yaml',
				})

				expect(result.fns.debug).toHaveProperty('mock')
				expect(typeof result.fns.debug?.mock).toBe('function')

				const restores = result.fns.debug?.mock!()
				expect(restores).toHaveLength(1)
				expect(mockerFunctionSpy).toHaveBeenCalledWith(result, '_message')

				restores[0]!()
				expect(mockRestore).toHaveBeenCalled()

				vi.restoreAllMocks()
			})

			it('creates mocks for multiple referenced functions', async () => {
				const mockRestore1 = vi.fn()
				const mockRestore2 = vi.fn()
				const mockerFunctionSpy = vi.spyOn(mocker, 'function')
				mockerFunctionSpy.mockReturnValueOnce({ mockRestore: mockRestore1, spy: vi.fn() })
				mockerFunctionSpy.mockReturnValueOnce({ mockRestore: mockRestore2, spy: vi.fn() })

				const definition = {
					fns: {
						complex: {
							mockFunction: ['helper1', 'helper2'],
							terms: [{ params: [], result: 'ab' }],
						},
						helper1: {
							terms: [{ params: [], result: 'a' }],
						},
						helper2: {
							terms: [{ params: [], result: 'b' }],
						},
					},
					module: 'node:path',
					subjectName: 'myFunc',
					subjectType: 'function' as const,
				}

				const result = await loader.createFromDefinition({
					definition,
					modulePath: '/test/multi.contract.yaml',
				})

				const restores = result.fns.complex?.mock!()
				expect(restores).toHaveLength(2)
				expect(mockerFunctionSpy).toHaveBeenCalledWith(result, 'helper1')
				expect(mockerFunctionSpy).toHaveBeenCalledWith(result, 'helper2')

				restores[0]!()
				restores[1]!()
				expect(mockRestore1).toHaveBeenCalled()
				expect(mockRestore2).toHaveBeenCalled()

				vi.restoreAllMocks()
			})

			it('function without mockFunction has no mock property', async () => {
				const definition = {
					fns: {
						simple: {
							terms: [{ params: [1], result: 1 }],
						},
					},
					module: 'node:path',
					subjectName: 'myFunc',
					subjectType: 'function' as const,
				}

				const result = await loader.createFromDefinition({
					definition,
					modulePath: '/test/simple.contract.yaml',
				})

				expect(result.fns.simple).not.toHaveProperty('mock')
			})

			it('throws when function tries to mock itself', async () => {
				const definition = {
					fns: {
						debug: {
							mockFunction: ['debug'],
							terms: [{ params: [], result: 'test' }],
						},
					},
					module: 'node:path',
					subjectName: 'myFunc',
					subjectType: 'function' as const,
				}

				await expect(
					loader.createFromDefinition({
						definition,
						modulePath: '/test/self-mock.contract.yaml',
					})
				).rejects.toThrow('Function "debug" cannot mock itself via mockFunction')
			})

			it('combines existing mock with mockFunction mocks', async () => {
				const depDefinition = {
					fns: { default: { terms: [{ params: ['x'], result: 'y' }] } },
					module: 'node:path',
					subjectName: 'dep',
					subjectType: 'function' as const,
				}

				const contractMockRestore = vi.fn()
				const fnMockRestore = vi.fn()
				vi.spyOn(loader['_yamlParserContract'], 'parseFile').mockResolvedValue(depDefinition)
				vi.spyOn(mocker, 'contract').mockReturnValue({ mockRestore: contractMockRestore, spy: vi.fn() })
				vi.spyOn(mocker, 'function').mockReturnValue({ mockRestore: fnMockRestore, spy: vi.fn() })

				const definition = {
					fns: {
						complex: {
							mock: ['./dep.contract.yaml'],
							mockFunction: ['internal'],
							terms: [{ params: [], result: 'done' }],
						},
						internal: {
							terms: [{ params: [], result: 'ok' }],
						},
					},
					module: 'node:path',
					subjectName: 'myFunc',
					subjectType: 'function' as const,
				}

				const result = await loader.createFromDefinition({
					definition,
					modulePath: '/test/combined.contract.yaml',
				})

				const restores = result.fns.complex?.mock!()
				expect(restores).toHaveLength(2)
				restores[0]!()
				restores[1]!()
				expect(contractMockRestore).toHaveBeenCalled()
				expect(fnMockRestore).toHaveBeenCalled()

				vi.restoreAllMocks()
			})
		})
	})
})
