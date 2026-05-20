import { YamlParserContractLoader } from '../contract-loader.js'
import { resolve } from 'node:path'
import { describe, expect, it, vi } from 'vitest'

import { contractorService } from '#src/contract/contractor-service.js'
import { mocker } from '#src/mocker/mocker.js'

const fixturesDir = resolve(__dirname, '..', '__fixtures__')

describe('YamlParserContractLoader integration', () => {
	const loader = new YamlParserContractLoader()

	describe('load', () => {
		it('loads function contract YAML and produces valid Contract', async () => {
			const result = await loader.load({
				path: resolve(fixturesDir, 'function.contract.yaml'),
			})

			expect(result.subjectName).toBe('join')
			expect(result.module).toBeDefined()
			expect(result.fns).toHaveProperty('default')
			expect(result.fns.default?.terms).toHaveLength(2)
			expect(result.fns.default?.terms[0]?.params).toEqual(['a', 'b'])
			expect(result.fns.default?.terms[0]?.result).toBe('a/b')
			expect(result.fns.default?.terms[1]?.params).toEqual(['x', 'y'])
			expect(result.fns.default?.terms[1]?.result).toBe('x/y')
		})

		it('loaded contract is structurally compatible with AnyContract type', async () => {
			const result = await loader.load({
				path: resolve(fixturesDir, 'function.contract.yaml'),
			})

			expect(result).toHaveProperty('module')
			expect(result).toHaveProperty('subjectName')
			expect(result).toHaveProperty('fns')
			expect(typeof result.subjectName).toBe('string')
			expect(typeof result.fns).toBe('object')
		})

		it('loaded contract produces correct test descriptions via contractorService', async () => {
			const result = await loader.load({
				path: resolve(fixturesDir, 'function.contract.yaml'),
			})

			const fnName = 'default'
			const fn = result.fns[fnName]!

			const description = contractorService.testDescription({ fnName })
			expect(description).toBe('default [contract]')

			const testName = contractorService.testName({ term: fn.terms[0]! })
			expect(testName).toBe('input: ["a","b"]   output: "a/b"')
		})

		it('loads error contract YAML and converts error to Error instance in result', async () => {
			const result = await loader.load({
				path: resolve(fixturesDir, 'error.contract.yaml'),
			})

			const term = result.fns.default?.terms[0]
			expect(term?.result).toBeInstanceOf(Error)
			if (term?.result instanceof Error) {
				expect(term.result.message).toBe('Something went wrong')
			}
		})

		it('loads contract with mock references and creates working mock', async () => {
			const mockRestore = vi.fn()
			const mockerSpy = vi.spyOn(mocker, 'contract').mockReturnValue({
				mockRestore,
				spy: vi.fn(),
			})

			const result = await loader.load({
				path: resolve(fixturesDir, 'mock-main.contract.yaml'),
			})

			expect(result).toHaveProperty('mock')
			expect(typeof result.mock).toBe('function')

			const restores = result.mock!()
			expect(Array.isArray(restores)).toBe(true)
			expect(restores).toHaveLength(1)

			restores[0]!()
			expect(mockRestore).toHaveBeenCalled()

			mockerSpy.mockRestore()
		})

		it('throws for non-existent YAML file', async () => {
			await expect(
				loader.load({
					path: resolve(fixturesDir, 'non-existent.contract.yaml'),
				})
			).rejects.toThrow('YAML contract file not found')
		})
	})
})
