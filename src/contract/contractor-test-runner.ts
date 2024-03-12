import { describe } from '@jest/globals'
import { glob } from 'glob'
import path from 'path'

import { contractor } from '#/contract/contractor'
import { AnyContract } from '#/types'

export const contractorTestRunner = {
	_file: async (fileLocation: string): Promise<void> => {
		const modulePath = path.join(process.cwd(), fileLocation)
		// console.log('contractorTestRunner.dir params:', { fileLocation, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
		const contract = await import(modulePath)
		contractorTestRunner.contract(contract.default as any)
	},
	contract: (contract: AnyContract): void => {
		describe(contract.subjectName, () => {
			Object.keys(contract.fns).forEach((fnName: string) => {
				contractor(contract as any, fnName)
			})
		})
	},
	dir: async (dirLocation: string): Promise<void> => {
		describe(dirLocation, () => {
			Promise.all(glob.sync(`${dirLocation}/**/*.contract.ts`).map(contractorTestRunner._file))
		})
	},
	file: (fileLocation: string): void => {
		describe(fileLocation, async () => {
			await contractorTestRunner._file(fileLocation)
		})
	},
}
