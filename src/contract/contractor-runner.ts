import { AnyContract } from '../types/index'
import { contractor } from './contractor'
import { glob } from 'glob'

export const contractorRunner = {
  contract: (contract: AnyContract): void => {
    describe(contract.subjectName, () => {
      Object.keys(contract.fn).forEach((fnName: string) => {
        contractor(contract as any, fnName)
      })
    })
  },
  dir: (location: string): void => {
    describe(location, () => {
      glob.sync(`${location}/**/*.contract.ts`).forEach((file) => {
        const contract = require(file.slice(2, -3))
        contractorRunner.contract(contract.default as any)
      })
    })
  },
}
