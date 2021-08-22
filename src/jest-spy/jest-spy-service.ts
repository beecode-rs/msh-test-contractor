import { ContractFnTerm } from '../types'
import { JestSpyClassFunctionStrategy } from './jest-spy-class-function-strategy'
import { JestSpyFunctionStrategy } from './jest-spy-function-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'

export const jestSpyService = {
  strategyFromTerms: ({
    terms,
    fnName,
    mockClassParams,
  }: {
    terms: ContractFnTerm[]
    fnName: string
    mockClassParams?: any[]
  }): JestSpyStrategy => {
    if (!terms || terms.length === 0) throw new Error(`Terms missing from the [${fnName}] function`)
    const { constructorParams } = terms[0]
    if (mockClassParams && constructorParams) return new JestSpyClassFunctionStrategy({ fnName, terms, mockClassParams })
    return new JestSpyFunctionStrategy({ terms })
  },
}
