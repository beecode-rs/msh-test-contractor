import { AnyContract } from '../types/index'
import { contractor } from './contractor'
import { glob } from 'glob'

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
        const contract = require(file.slice(2, -3))
        contractorTestRunner.contract(contract.default as any)
      })
    })
  },
}
