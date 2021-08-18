import { SubjectFomContract } from '../../subject/subject-strategy'
import { AnyContract, ContractTerm } from '../../types'
import { fnUtil } from '../../util/fn-util'
import { JestSpyClassFunctionStrategy } from './jest-spy-class-function-strategy'
import { JestSpyConstructorStrategy } from './jest-spy-constructor-strategy'
import { JestSpyFunctionStrategy } from './jest-spy-function-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'
import deepEqual from 'deep-equal'

export const jestSpyService = {
  strategyFromContract: ({
    contract: { module, subjectName, fn },
    fnName,
  }: {
    contract: AnyContract
    fnName: string
  }): JestSpyStrategy => {
    const subjectFromContract = { module, subjectName } as SubjectFomContract
    const constructorParams = fn[fnName]!.terms[0].constructorParams

    if (fnUtil.isConstructor(fnName)) return new JestSpyConstructorStrategy({ subjectFromContract })
    if (constructorParams) return new JestSpyClassFunctionStrategy({ subjectFromContract, fnName })

    return new JestSpyFunctionStrategy({ subjectFromContract, fnName })
  },
  simpleMock: (terms: ContractTerm[]): any => {
    return (...mockParams: any[]): any => {
      const foundTerm = terms.find((term) => deepEqual(term.params, mockParams))
      if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)

      if (foundTerm instanceof Error) throw foundTerm.result
      return foundTerm.result
    }
  },
  classMock: (terms: ContractTerm[], fnName: string): any => {
    return (...mockClassParams: any[]): any => ({
      [fnName]: (...mockFnParams: any[]): any => {
        const foundTerm = terms.find(
          (term) => deepEqual(term.constructorParams, mockClassParams) && deepEqual(term.params, mockFnParams)
        )
        if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockFnParams)}`)

        if (foundTerm instanceof Error) throw foundTerm.result
        return foundTerm.result
      },
    })
  },
}
