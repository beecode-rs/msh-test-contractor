import { ContractTerm } from '../types/index'
import { JestSpyClassFunctionStrategy } from './jest-spy-class-function-strategy'
import { JestSpyFunctionStrategy } from './jest-spy-function-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'

export const jestSpyService = {
  strategyFromTerms: ({ terms, mockClassParams }: { terms: ContractTerm[]; mockClassParams?: any[] }): JestSpyStrategy => {
    if (terms.length === 0) throw new Error('Terms missing')
    const { constructorParams } = terms[0]
    if (mockClassParams && constructorParams) return new JestSpyClassFunctionStrategy({ terms, mockClassParams })
    return new JestSpyFunctionStrategy({ terms })
  },
}
