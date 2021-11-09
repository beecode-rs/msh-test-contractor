import { ContractTerm } from '../../types'
import { ContractExpectAnyEqualStrategy } from './contract-expect-any-equal-strategy'
import { ContractExpectFunctionResultEqualStrategy } from './contract-expect-function-result-equal-strategy'
import { ContractExpectThrowErrorStrategy } from './contract-expect-throw-error-strategy'

export interface ContractExpectStrategy {
  test(fn: () => any): Promise<void>
}

export const contractExpectService = {
  fromTerm: (params: { term: ContractTerm }): ContractExpectStrategy => {
    const { term } = params
    if (term.result instanceof Error) return new ContractExpectThrowErrorStrategy({ term })
    if (term.returnFnParams) return new ContractExpectFunctionResultEqualStrategy({ term })
    return new ContractExpectAnyEqualStrategy({ term })
  },
}
