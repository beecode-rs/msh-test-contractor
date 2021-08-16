import { contractor } from './contractor'
import { Contract } from './types/index'
import { glob } from 'glob'

export const contractorRunner = {
  contract: (contract: Contract<any, any, any>): void => {
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
