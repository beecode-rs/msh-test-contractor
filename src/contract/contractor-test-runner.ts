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
  dir: (dirLocation: string): void => {
    describe(dirLocation, () => glob.sync(`${dirLocation}/**/*.contract.ts`).forEach(contractorTestRunner._file))
  },
  file: (fileLocation: string): void => {
    describe(fileLocation, () => contractorTestRunner._file(fileLocation))
  },
  _file: (fileLocation: string): void => {
    const modulePath = path.join(process.cwd(), fileLocation)
    // console.log('contractorTestRunner.dir params:', { fileLocation, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
    const contract = require(modulePath)
    contractorTestRunner.contract(contract.default as any)
  },
}
