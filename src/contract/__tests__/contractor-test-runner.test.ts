import { glob } from 'glob'
import { describe, expect, it, vi } from 'vitest'

import { YamlParserContractLoader } from '#src/business/component/yaml-parser/contract-loader.js'
import { contractorTestRunner } from '#src/contract/contractor-test-runner.js'

describe('contractorTestRunner', () => {
	describe('YAML file discovery', () => {
		it('glob pattern finds *.contract.yaml files', () => {
			const pattern = `./src/business/component/yaml-parser/__fixtures__/**/*.contract.yaml`
			const files = glob.sync(pattern)

			expect(files.length).toBeGreaterThan(0)
			files.forEach((file) => {
				expect(file).toMatch(/\.contract\.yaml$/)
			})
		})

		it('glob pattern does not find *.contract.ts files', () => {
			const pattern = `./src/business/component/yaml-parser/__fixtures__/**/*.contract.yaml`
			const files = glob.sync(pattern)

			files.forEach((file) => {
				expect(file).not.toMatch(/\.contract\.ts$/)
			})
		})
	})

	describe('_file', () => {
		it('loads YAML contract and registers tests', async () => {
			const mockContract = {
				fns: {
					default: {
						terms: [{ params: [], result: 'test' }],
					},
				},
				module: { testFn: () => 'test' },
				subjectName: 'testSubject',
			}

			const loadSpy = vi.spyOn(YamlParserContractLoader.prototype, 'load').mockResolvedValue(mockContract)

			const contractSpy = vi.spyOn(contractorTestRunner, 'contract').mockImplementation(() => undefined)

			await contractorTestRunner._file('./src/business/component/yaml-parser/__fixtures__/function.contract.yaml')

			expect(loadSpy).toHaveBeenCalledWith({
				path: expect.stringContaining('function.contract.yaml'),
			})
			expect(contractSpy).toHaveBeenCalledWith(mockContract)

			loadSpy.mockRestore()
			contractSpy.mockRestore()
		})
	})
})
