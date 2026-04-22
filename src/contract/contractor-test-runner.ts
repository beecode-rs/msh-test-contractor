import { glob } from 'glob'
import path from 'path'
import { describe } from 'vitest'

import { YamlParserContractLoader } from '#src/business/component/yaml-parser/contract-loader.js'
import { contractor } from '#src/contract/contractor.js'
import { type AnyContract } from '#src/types/index.js'

const yamlLoader = new YamlParserContractLoader()

export const contractorTestRunner = {
	_file: async (fileLocation: string): Promise<void> => {
		const absolutePath = path.join(process.cwd(), fileLocation)
		const contract = await yamlLoader.load({ path: absolutePath })
		contractorTestRunner.contract(contract)
	},
	contract: (contract: AnyContract): void => {
		describe(contract.subjectName, () => {
			Object.keys(contract.fns).forEach((fnName: string) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				contractor(contract as any, fnName)
			})
		})
	},
	dir: async (dirLocation: string): Promise<void> => {
		const files = glob.sync(`${dirLocation}/**/*.contract.yaml`, { ignore: ['**/__fixtures__/**'] })
		await files.reduce(async (promise, file) => {
			await promise
			await contractorTestRunner._file(file)
		}, Promise.resolve())
	},
	file: (fileLocation: string): void => {
		describe(fileLocation, async () => {
			await contractorTestRunner._file(fileLocation)
		})
	},
}
