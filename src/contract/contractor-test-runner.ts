import { glob } from 'glob'
import path from 'path'
import { describe } from 'vitest'

import { contractor } from '#src/contract/contractor.js'
import { type AnyContract } from '#src/types/index.js'

export const contractorTestRunner = {
	_file: async (fileLocation: string): Promise<void> => {
		const modulePath = path.join(process.cwd(), fileLocation)
		// console.log('contractorTestRunner.dir params:', { fileLocation, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
		const contract = await import(modulePath)
		contractorTestRunner.contract(contract.default)
	},
	contract: (contract: AnyContract): void => {
		describe(contract.subjectName, () => {
			Object.keys(contract.fns).forEach((fnName: string) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				contractor(contract as any, fnName)
			})
		})
	},
	// eslint-disable-next-line @typescript-eslint/require-await
	dir: async (dirLocation: string): Promise<void> => {
		describe(dirLocation, () => {
			void Promise.all(glob.sync(`${dirLocation}/**/*.contract.ts`).map(contractorTestRunner._file))
		})
	},
	file: (fileLocation: string): void => {
		describe(fileLocation, async () => {
			await contractorTestRunner._file(fileLocation)
		})
	},
}
