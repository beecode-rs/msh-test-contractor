import { glob } from 'glob'
import { describe, expect, it, vi } from 'vitest'

import { YamlParserContractLoader } from '#src/business/component/yaml-parser/contract-loader.js'
import { contractorTestRunner } from '#src/business/component/contractor/contractor-test-runner.js'

vi.mock('#src/business/service/contractor.js', () => ({
	contractor: vi.fn(),
}))

const { contractor: mockedContractor } = await import('#src/business/service/contractor.js')

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

		it('throws with error message when load fails with Error instance', async () => {
			const loadSpy = vi.spyOn(YamlParserContractLoader.prototype, 'load').mockRejectedValue(new Error('yaml parse error'))

			await expect(contractorTestRunner._file('./nonexistent.yaml')).rejects.toThrow(
				'Failed to load contract file "./nonexistent.yaml": yaml parse error'
			)

			loadSpy.mockRestore()
		})

		it('throws with stringified error when load fails with non-Error string', async () => {
			const loadSpy = vi.spyOn(YamlParserContractLoader.prototype, 'load').mockRejectedValue('string error')

			await expect(contractorTestRunner._file('./nonexistent.yaml')).rejects.toThrow(
				'Failed to load contract file "./nonexistent.yaml": string error'
			)

			loadSpy.mockRestore()
		})

		it('throws with stringified error when load fails with non-Error number', async () => {
			const loadSpy = vi.spyOn(YamlParserContractLoader.prototype, 'load').mockRejectedValue(404)

			await expect(contractorTestRunner._file('./nonexistent.yaml')).rejects.toThrow(
				'Failed to load contract file "./nonexistent.yaml": 404'
			)

			loadSpy.mockRestore()
		})
	})

	describe('contract', () => {
		const calledFns: string[] = []
		const mockContract = {
			fns: { add: { terms: [] }, multiply: { terms: [] }, subtract: { terms: [] } },
			module: {},
			subjectName: 'testSubject',
		}

		mockedContractor.mockImplementation((_: unknown, fnName: string) => {
			calledFns.push(fnName)
		})
		contractorTestRunner.contract(mockContract as any) // eslint-disable-line @typescript-eslint/no-explicit-any

		it('calls contractor for each function name in contract', () => {
			expect(calledFns.sort()).toEqual(['add', 'multiply', 'subtract'])
		})
	})

	describe('dir', () => {
		it('processes all discovered contract files sequentially', async () => {
			const processedFiles: string[] = []
			const globSpy = vi.spyOn(glob, 'sync').mockReturnValue(['file1.yaml', 'file2.yaml', 'file3.yaml'])
			// eslint-disable-next-line @typescript-eslint/require-await
			const fileSpy = vi.spyOn(contractorTestRunner, '_file').mockImplementation(async (file: string) => {
				processedFiles.push(file)
			})

			await contractorTestRunner.dir('./src/some-dir')

			expect(globSpy).toHaveBeenCalledWith('./src/some-dir/**/*.contract.yaml', { ignore: ['**/__fixtures__/**'] })
			expect(fileSpy).toHaveBeenCalledTimes(3)
			expect(processedFiles).toEqual(['file1.yaml', 'file2.yaml', 'file3.yaml'])

			globSpy.mockRestore()
			fileSpy.mockRestore()
		})

		it('does nothing when no contract files found', async () => {
			const globSpy = vi.spyOn(glob, 'sync').mockReturnValue([])
			const fileSpy = vi.spyOn(contractorTestRunner, '_file').mockResolvedValue()

			await contractorTestRunner.dir('./empty-dir')

			expect(fileSpy).not.toHaveBeenCalled()

			globSpy.mockRestore()
			fileSpy.mockRestore()
		})
	})
})
