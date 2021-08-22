import { AnyContract } from '../types'
import { contractor } from './contractor'
import { glob } from 'glob'
import path from 'path'

export const contractorTestRunner = {
  contract: (contract: AnyContract): void => {
    describe(contract.subjectName, () => {
      Object.keys(contract.fns).forEach((fnName: string) => {
        contractor(contract as any, fnName)
      })
    })
  },
  dir: (location: string): void => {
    describe(location, () => {
      glob.sync(`${location}/**/*.contract.ts`).forEach((file) => {
        const modulePath = path.join(process.cwd(), file)
        // console.log('contractorTestRunner.dir params:', { location, file, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
        const contract = require(modulePath)
        contractorTestRunner.contract(contract.default as any)
      })
    })
  },
}
