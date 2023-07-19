import { glob } from 'glob'
import path from 'path'

import { contractor } from '#/contract/contractor.js'
import { AnyContract } from '#/types/index.js'

export const contractorTestRunner = {
	_file: (fileLocation: string): void => {
		const modulePath = path.join(process.cwd(), fileLocation)
		// console.log('contractorTestRunner.dir params:', { fileLocation, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
		const contract = require(modulePath)
		contractorTestRunner.contract(contract.default as any)
	},
	contract: (contract: AnyContract): void => {
		describe(contract.subjectName, () => {
			Object.keys(contract.fns).forEach((fnName: string) => {
				contractor(contract as any, fnName)
			})
		})
	},
	dir: (dirLocation: string): void => {
		describe(dirLocation, () => glob.sync(`${dirLocation}/**/*.contract.ts`).forEach(contractorTestRunner._file))
	},
	file: (fileLocation: string): void => {
		describe(fileLocation, () => contractorTestRunner._file(fileLocation))
	},
}
