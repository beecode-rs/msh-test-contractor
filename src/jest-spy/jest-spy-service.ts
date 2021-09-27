import { ContractTerm } from '../types'
import { JestSpyClassFunctionStrategy } from './jest-spy-class-function-strategy'
import { JestSpyFunctionStrategy } from './jest-spy-function-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'

export const jestSpyService = {
  strategyFromTerms: ({
    terms,
    mockClassParams,
    name,
  }: {
    terms: ContractTerm[]
    mockClassParams?: any[]
    name: string
  }): JestSpyStrategy => {
    if (terms.length === 0) throw new Error('Terms missing')
    const { constructorParams } = terms[0]
    if (mockClassParams && constructorParams) return new JestSpyClassFunctionStrategy({ terms, mockClassParams, name })
    return new JestSpyFunctionStrategy({ terms, name })
  },
}
