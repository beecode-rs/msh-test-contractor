import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { YamlParserContract } from '#src/business/component/yaml-parser/contract-parser.js'

describe('YamlParserContract', () => {
	const yamlParserContract = new YamlParserContract()

	describe('parseString', () => {
		it('parses a basic YAML contract with subject and module', () => {
			const yamlString = `
subject: myFunction
module: ./my-module.js
`
			const result = yamlParserContract.parseString({ yaml: yamlString })

			expect(result.subjectName).toBe('myFunction')
			expect(result.module).toBe('./my-module.js')
			expect(result.subjectType).toBe('function')
			expect(result.fns).toEqual({})
		})

		it('throws error for invalid YAML (non-object root)', () => {
			const yamlString = 'just a string'

			expect(() => yamlParserContract.parseString({ yaml: yamlString })).toThrow('Invalid YAML: expected an object at the root')
		})

		it('throws error for null YAML root', () => {
			const yamlString = 'null'

			expect(() => yamlParserContract.parseString({ yaml: yamlString })).toThrow('Invalid YAML: expected an object at the root')
		})

		it('handles empty subject and module gracefully', () => {
			const yamlString = '{}'

			const result = yamlParserContract.parseString({ yaml: yamlString })

			expect(result.subjectName).toBe('')
			expect(result.module).toBe('')
		})

		describe('US-002: Field mapping and transformations', () => {
			it('maps methods field to fns', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  default:
    terms:
      - params: [1, 2]
        result: 3
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns).toHaveProperty('default')
				expect(result.fns.default?.terms).toHaveLength(1)
				expect(result.fns.default?.terms[0]?.params).toEqual([1, 2])
				expect(result.fns.default?.terms[0]?.result).toBe(3)
			})

			it('handles constructor field by moving to fns.CONSTRUCTOR', () => {
				const yamlString = `
subject: MyClass
module: ./my-module.js
constructor:
  terms:
    - params: ['initialValue']
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns).toHaveProperty('CONSTRUCTOR')
				expect(result.fns.CONSTRUCTOR!.terms).toHaveLength(1)
				expect(result.fns.CONSTRUCTOR!.terms[0]!.params).toEqual(['initialValue'])
			})

			it('maps __self__ method key to SELF', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [1]
        result: 1
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns).toHaveProperty('SELF')
				expect(result.fns).not.toHaveProperty('__self__')
				expect(result.fns.SELF!.terms).toHaveLength(1)
				expect(result.fns.SELF!.terms[0]!.params).toEqual([1])
				expect(result.fns.SELF!.terms[0]!.result).toBe(1)
			})

			it('maps both CONSTRUCTOR and __self__ keys correctly', () => {
				const yamlString = `
subject: MyService
module: ./my-service.js
constructor:
  terms:
    - params: []
methods:
  __self__:
    terms:
      - params: [1]
        result: 1
  regularMethod:
    terms:
      - params: [2]
        result: 2
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns).toHaveProperty('CONSTRUCTOR')
				expect(result.fns).toHaveProperty('SELF')
				expect(result.fns).toHaveProperty('regularMethod')
				expect(result.fns).not.toHaveProperty('constructor')
				expect(result.fns).not.toHaveProperty('__self__')
			})

			it('maps module field correctly', () => {
				const yamlString = `
subject: myFunction
module: ./path/to/module.js
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.module).toBe('./path/to/module.js')
			})

			it('preserves terms array within each method', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  add:
    terms:
      - params: [1, 2]
        result: 3
      - params: [5, 5]
        result: 10
  subtract:
    terms:
      - params: [10, 4]
        result: 6
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.add!.terms).toHaveLength(2)
				expect(result.fns.subtract!.terms).toHaveLength(1)
			})

			it('transforms term fields (params, result, error)', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  mightFail:
    terms:
      - params: [1, 2]
        result: success
      - params: [1, 'invalid']
        error: Invalid input
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.mightFail.terms[0].params).toEqual([1, 2])
				expect(result.fns.mightFail.terms[0].result).toBe('success')
				expect(result.fns.mightFail.terms[0].error).toBeUndefined()

				expect(result.fns.mightFail.terms[1].params).toEqual([1, 'invalid'])
				expect(result.fns.mightFail.terms[1].result).toBeUndefined()
				expect(result.fns.mightFail.terms[1].error).toBe('Invalid input')
			})

			it('handles methods with no terms (returns empty array)', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  emptyMethod:
    terms: []
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.emptyMethod.terms).toEqual([])
			})

			it('handles methods without terms field (returns empty array)', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  noTermsMethod: {}
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.noTermsMethod.terms).toEqual([])
			})
		})

		describe('US-003: Integrate special object and shorthand parsers', () => {
			describe('special object parsing', () => {
				it('parses new Error() in result value', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  mightFail:
    terms:
      - params: ['invalid']
        result: 'new Error("Invalid input")'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.mightFail.terms[0].result).toBeInstanceOf(Error)
					if (result.fns.mightFail.terms[0].result instanceof Error) {
						expect(result.fns.mightFail.terms[0].result.message).toBe('Invalid input')
					}
				})

				it('parses new Error() in error field', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  mightFail:
    terms:
      - params: ['invalid']
        error: 'new Error("Something went wrong")'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.mightFail.terms[0].error).toBeInstanceOf(Error)
					if (result.fns.mightFail.terms[0].error instanceof Error) {
						expect(result.fns.mightFail.terms[0].error.message).toBe('Something went wrong')
					}
				})

				it('parses Promise.resolve() in result value', async () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  asyncOp:
    terms:
      - params: [1]
        result: 'Promise.resolve(42)'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.asyncOp.terms[0].result).toBeInstanceOf(Promise)
					await expect(result.fns.asyncOp.terms[0].result).resolves.toBe(42)
				})

				it('parses Promise.reject() in error field', async () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  asyncOp:
    terms:
      - params: [-1]
        error: 'Promise.reject(new Error("Invalid"))'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.asyncOp.terms[0].error).toBeInstanceOf(Promise)
					await expect(result.fns.asyncOp.terms[0].error).rejects.toThrow('Invalid')
				})

				it('parses new Date() in params', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  dateOp:
    terms:
      - params: ['new Date("2024-01-15")']
        result: '2024-01-15'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.dateOp.terms[0].params?.[0]).toBeInstanceOf(Date)
					if (result.fns.dateOp.terms[0].params?.[0] instanceof Date) {
						expect(result.fns.dateOp.terms[0].params[0].getFullYear()).toBe(2024)
					}
				})

				it('parses new RegExp() in result', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  getPattern:
    terms:
      - params: []
        result: 'new RegExp("^[a-z]+$")'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.getPattern.terms[0].result).toBeInstanceOf(RegExp)
					if (result.fns.getPattern.terms[0].result instanceof RegExp) {
						expect(result.fns.getPattern.terms[0].result.source).toBe('^[a-z]+$')
					}
				})
			})

			describe('nested objects with special values', () => {
				it('parses special objects in nested object params', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  complexOp:
    terms:
      - params:
          - error: 'new Error("nested error")'
            date: 'new Date("2024-06-01")'
        result: true
`
					const result = yamlParserContract.parseString({ yaml: yamlString })
					const param = result.fns.complexOp.terms[0].params?.[0] as {
						error: Error
						date: Date
					}

					expect(param.error).toBeInstanceOf(Error)
					expect(param.error.message).toBe('nested error')
					expect(param.date).toBeInstanceOf(Date)
					expect(param.date.getMonth()).toBe(5) // June is month 5 (0-indexed)
				})

				it('parses special objects in arrays within params', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  arrayOp:
    terms:
      - params:
          - ['new Error("err1")', 'new Error("err2")']
        result: 2
`
					const result = yamlParserContract.parseString({ yaml: yamlString })
					const arr = result.fns.arrayOp.terms[0].params?.[0] as Error[]

					expect(arr[0]).toBeInstanceOf(Error)
					expect(arr[0].message).toBe('err1')
					expect(arr[1]).toBeInstanceOf(Error)
					expect(arr[1].message).toBe('err2')
				})

				it('parses special objects in deeply nested structures', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  deepOp:
    terms:
      - params:
          - level1:
              level2:
                error: 'new Error("deep error")'
        result: true
`
					const result = yamlParserContract.parseString({ yaml: yamlString })
					const param = result.fns.deepOp.terms[0].params?.[0] as {
						level1: { level2: { error: Error } }
					}

					expect(param.level1.level2.error).toBeInstanceOf(Error)
					expect(param.level1.level2.error.message).toBe('deep error')
				})
			})

			describe('shorthand string parsing', () => {
				it('converts shorthand string "[1, 2] => 3" to structured term', () => {
					const yamlString = `
subject: add
module: ./math.js
methods:
  default:
    terms:
      - shorthand: '[1, 2] => 3'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.default.terms[0].params).toEqual([1, 2])
					expect(result.fns.default.terms[0].result).toBe(3)
				})

				it('converts shorthand string with no params "=> 42"', () => {
					const yamlString = `
subject: getAnswer
module: ./deep-thought.js
methods:
  default:
    terms:
      - shorthand: '=> 42'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.default.terms[0].params).toEqual([])
					expect(result.fns.default.terms[0].result).toBe(42)
				})

				it('converts shorthand string with constructor params "([initial]);[value] => result"', () => {
					const yamlString = `
subject: Counter
module: ./counter.js
constructor:
  terms:
    - shorthand: '([10]);[5] => 15'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.CONSTRUCTOR.terms[0].constructorParams).toEqual([10])
					expect(result.fns.CONSTRUCTOR.terms[0].params).toEqual([5])
					expect(result.fns.CONSTRUCTOR.terms[0].result).toBe(15)
				})

				it('converts shorthand with object result', () => {
					const yamlString = `
subject: getUser
module: ./users.js
methods:
  default:
    terms:
      - shorthand: '[1] => {"id": 1, "name": "test"}'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.default.terms[0].params).toEqual([1])
					expect(result.fns.default.terms[0].result).toEqual({ id: 1, name: 'test' })
				})
			})

			describe('mixed regular and special values', () => {
				it('leaves regular strings unchanged when they do not match special patterns', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  greet:
    terms:
      - params: ['hello world']
        result: 'HELLO WORLD'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.greet.terms[0].params).toEqual(['hello world'])
					expect(result.fns.greet.terms[0].result).toBe('HELLO WORLD')
				})

				it('leaves numbers and booleans unchanged', () => {
					const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  transform:
    terms:
      - params: [42, true, false, null]
        result: 'done'
`
					const result = yamlParserContract.parseString({ yaml: yamlString })

					expect(result.fns.transform.terms[0].params).toEqual([42, true, false, null])
				})
			})
		})

		describe('US-004: Subject type inference', () => {
			it('infers subjectType "class" when constructor field exists', () => {
				const yamlString = `
subject: MyClass
module: ./my-module.js
constructor:
  terms:
    - params: ['initialValue']
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.subjectType).toBe('class')
			})

			it('infers subjectType "function" when no constructor field', () => {
				const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  default:
    terms:
      - params: [1, 2]
        result: 3
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.subjectType).toBe('function')
			})

			it('allows explicit subjectType override "class"', () => {
				const yamlString = `
subject: MyExplicitClass
module: ./my-module.js
subjectType: class
methods:
  default:
    terms:
      - params: []
        result: true
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.subjectType).toBe('class')
			})

			it('allows explicit subjectType override "function"', () => {
				const yamlString = `
subject: MyExplicitFunction
module: ./my-module.js
subjectType: function
constructor:
  terms:
    - params: []
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				// Explicit 'function' should override constructor inference
				expect(result.subjectType).toBe('function')
			})

			it('infers "function" for empty contract with no methods or constructor', () => {
				const yamlString = `
subject: emptyFunction
module: ./empty.js
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.subjectType).toBe('function')
			})

			it('infers "class" with both constructor and methods', () => {
				const yamlString = `
subject: ServiceClass
module: ./service.js
constructor:
  terms:
    - params: ['config']
methods:
  process:
    terms:
      - params: ['input']
        result: 'output'
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.subjectType).toBe('class')
				expect(result.fns).toHaveProperty('CONSTRUCTOR')
				expect(result.fns).toHaveProperty('process')
			})
		})
	})

	describe('parseFile', () => {
		const testDir = join(tmpdir(), 'yaml-parser-contract-test')

		// Clean up test directory before and after all tests
		beforeAll(async () => {
			await rm(testDir, { force: true, recursive: true })
			await mkdir(testDir, { recursive: true })
		})

		afterAll(async () => {
			await rm(testDir, { force: true, recursive: true })
		})

		it('parses a valid YAML file and returns correct contract object', async () => {
			const yamlContent = `
subject: myFunction
module: ./my-module.js
methods:
  default:
    terms:
      - params: [1, 2]
        result: 3
`
			const filePath = join(testDir, 'valid.contract.yaml')
			await writeFile(filePath, yamlContent, 'utf-8')

			const result = await yamlParserContract.parseFile({ path: filePath })

			expect(result.subjectName).toBe('myFunction')
			expect(result.module).toBe('./my-module.js')
			expect(result.subjectType).toBe('function')
			expect(result.fns.default.terms).toHaveLength(1)
			expect(result.fns.default.terms[0].params).toEqual([1, 2])
			expect(result.fns.default.terms[0].result).toBe(3)
		})

		it('parses YAML file with special objects', async () => {
			const yamlContent = `
subject: errorFunction
module: ./error-module.js
methods:
  mightFail:
    terms:
      - params: ['invalid']
        result: 'new Error("Invalid input")'
`
			const filePath = join(testDir, 'special-objects.contract.yaml')
			await writeFile(filePath, yamlContent, 'utf-8')

			const result = await yamlParserContract.parseFile({ path: filePath })

			expect(result.fns.mightFail.terms[0].result).toBeInstanceOf(Error)
			if (result.fns.mightFail.terms[0].result instanceof Error) {
				expect(result.fns.mightFail.terms[0].result.message).toBe('Invalid input')
			}
		})

		it('parses YAML file with shorthand terms', async () => {
			const yamlContent = `
subject: add
module: ./math.js
methods:
  default:
    terms:
      - shorthand: '[1, 2] => 3'
`
			const filePath = join(testDir, 'shorthand.contract.yaml')
			await writeFile(filePath, yamlContent, 'utf-8')

			const result = await yamlParserContract.parseFile({ path: filePath })

			expect(result.fns.default.terms[0].params).toEqual([1, 2])
			expect(result.fns.default.terms[0].result).toBe(3)
		})

		it('infers subjectType "class" when constructor exists', async () => {
			const yamlContent = `
subject: MyClass
module: ./my-class.js
constructor:
  terms:
    - params: ['initialValue']
`
			const filePath = join(testDir, 'class.contract.yaml')
			await writeFile(filePath, yamlContent, 'utf-8')

			const result = await yamlParserContract.parseFile({ path: filePath })

			expect(result.subjectType).toBe('class')
			expect(result.fns.CONSTRUCTOR!.terms).toHaveLength(1)
		})

		it('throws descriptive error for file not found', async () => {
			const filePath = join(testDir, 'nonexistent.contract.yaml')

			await expect(yamlParserContract.parseFile({ path: filePath })).rejects.toThrow(`YAML contract file not found: ${filePath}`)
		})

		it('throws descriptive error for invalid YAML content', async () => {
			const yamlContent = 'just a string'
			const filePath = join(testDir, 'invalid.contract.yaml')
			await writeFile(filePath, yamlContent, 'utf-8')

			await expect(yamlParserContract.parseFile({ path: filePath })).rejects.toThrow(
				'Invalid YAML: expected an object at the root'
			)
		})

		it('handles empty file gracefully', async () => {
			const yamlContent = ''
			const filePath = join(testDir, 'empty.contract.yaml')
			await writeFile(filePath, yamlContent, 'utf-8')

			// Empty YAML is parsed as null
			await expect(yamlParserContract.parseFile({ path: filePath })).rejects.toThrow(
				'Invalid YAML: expected an object at the root'
			)
		})
	})

	describe('US-006: Exports and comprehensive tests', () => {
		it('exports YamlParserContract class from index', async () => {
			const { YamlParserContract: ImportedClass } = await import('#src/business/component/yaml-parser/index.js')

			expect(new ImportedClass()).toBeInstanceOf(ImportedClass)
		})

		it('handles missing subject and module gracefully (lenient parsing)', () => {
			const yamlString = `
methods:
  default:
    terms:
      - params: [1]
        result: 2
`
			const result = yamlParserContract.parseString({ yaml: yamlString })

			// Parser is lenient - missing fields return empty strings
			expect(result.subjectName).toBe('')
			expect(result.module).toBe('')
			expect(result.subjectType).toBe('function')
			expect(result.fns.default.terms).toHaveLength(1)
		})

		it('throws error for non-array terms (malformed contract)', () => {
			const yamlString = `
subject: myFunction
module: ./my-module.js
methods:
  default:
    terms: "not an array"
`
			// The implementation expects terms to be an array
			// Note: This throws a generic TypeError - could be improved with better validation
			expect(() => yamlParserContract.parseString({ yaml: yamlString })).toThrow()
		})
	})

	describe('per-function mock', () => {
		it('parses mock field on a method', () => {
			const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  doWork:
    mock:
      - ./dep.contract.yaml
    terms:
      - params: [1]
        result: 2
`
			const result = yamlParserContract.parseString({ yaml: yamlString })

			expect(result.fns.doWork!.mock).toEqual(['./dep.contract.yaml'])
			expect(result.fns.doWork!.terms).toHaveLength(1)
		})

		it('parses mock field with multiple paths', () => {
			const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  doWork:
    mock:
      - ./dep1.contract.yaml
      - ./dep2.contract.yaml
    terms:
      - params: []
        result: ok
`
			const result = yamlParserContract.parseString({ yaml: yamlString })

			expect(result.fns.doWork!.mock).toEqual(['./dep1.contract.yaml', './dep2.contract.yaml'])
		})

		it('method without mock field has no mock property', () => {
			const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  simple:
    terms:
      - params: [1]
        result: 1
`
			const result = yamlParserContract.parseString({ yaml: yamlString })

			expect(result.fns.simple!.mock).toBeUndefined()
		})

		it('parses mock on constructor', () => {
			const yamlString = `
subject: MyClass
module: ./my-module.js
constructor:
  mock:
    - ./dep.contract.yaml
  terms:
    - params: []
      result: {}
`
			const result = yamlParserContract.parseString({ yaml: yamlString })

			expect(result.fns.CONSTRUCTOR!.mock).toEqual(['./dep.contract.yaml'])
		})
		describe('mockFunction (intra-contract)', () => {
			it('parses mockFunction field on a method', () => {
				const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  debug:
    mockFunction:
      - _message
    terms:
      - params: ['test']
        result: ok
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.debug!.mockFunction).toEqual(['_message'])
				expect(result.fns.debug!.terms).toHaveLength(1)
			})

			it('parses mockFunction field with multiple function names', () => {
				const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  complex:
    mockFunction:
      - helper1
      - helper2
    terms:
      - params: []
        result: ok
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.complex!.mockFunction).toEqual(['helper1', 'helper2'])
			})

			it('method without mockFunction has no mockFunction property', () => {
				const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  simple:
    terms:
      - params: [1]
        result: 1
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.simple!.mockFunction).toBeUndefined()
			})

			it('parses both mock and mockFunction on same method', () => {
				const yamlString = `
subject: myFunc
module: ./my-module.js
methods:
  complex:
    mock:
      - ./dep.contract.yaml
    mockFunction:
      - _internal
    terms:
      - params: []
        result: ok
`
				const result = yamlParserContract.parseString({ yaml: yamlString })

				expect(result.fns.complex!.mock).toEqual(['./dep.contract.yaml'])
				expect(result.fns.complex!.mockFunction).toEqual(['_internal'])
			})
		})
	})
})
