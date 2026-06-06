import { glob } from 'glob'
import path from 'path'
import { describe } from 'vitest'

import { YamlParserContractLoader } from '#src/business/component/yaml-parser/contract-loader.js'
import { contractor } from '#src/business/service/contractor.js'
import { type AnyContract } from '#src/business/model/contract-model.js'

const yamlLoader = new YamlParserContractLoader()

const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message
	}

	return String(error)
}

export const contractorTestRunner = {
	_file: async (fileLocation: string): Promise<void> => {
		const absolutePath = contractorTestRunner._resolveAbsolutePath(fileLocation)
		let contract: AnyContract
		try {
			contract = await yamlLoader.load({ path: absolutePath })
		} catch (error) {
			throw new Error(`Failed to load contract file "${fileLocation}": ${getErrorMessage(error)}`)
		}
		contractorTestRunner.contract(contract)
	},
	_resolveAbsolutePath: (fileLocation: string): string => {
		if (path.isAbsolute(fileLocation)) {
			return fileLocation
		}

		return path.join(process.cwd(), fileLocation)
	},
	contract: (contract: AnyContract): void => {
		describe(contract.subjectName, () => {

			Object.keys(contract.fns).forEach((fnName: string) => {
				contractor(contract as any, fnName) // eslint-disable-line @typescript-eslint/no-explicit-any
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
	file: async (fileLocation: string): Promise<void> => {
		await contractorTestRunner._file(fileLocation)
	},
}
