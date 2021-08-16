import { contractor } from './contractor'
import { Contract, PropType } from './types/index'
import { glob } from 'glob'

export const contractorRunner = {
  contract: <
    M,
    SN extends string,
    // @ts-ignore
    S extends PropType<M, SN>,
    C extends Contract<M, SN, S>
  >(
    contract: C
  ): void => {
    describe(contract.subjectName, () => {
      Object.keys(contract.fn).forEach((fnName: string) => {
        // @ts-ignore
        contractor(contract, fnName)
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
