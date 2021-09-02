import { ContractTerm } from '../../types/index'
import { ContractExpectAnyEqualStrategy } from './contract-expect-any-equal-strategy'
import { ContractExpectFunctionResultEqualStrategy } from './contract-expect-function-result-equal-strategy'
import { ContractExpectStrategy } from './contract-expect-strategy'
import { ContractExpectThrowErrorStrategy } from './contract-expect-throw-error-strategy'

export const contractExpectService = {
  fromTerm: ({ term }: { term: ContractTerm }): ContractExpectStrategy => {
    if (term.result instanceof Error) return new ContractExpectThrowErrorStrategy({ term })
    if (term.returnFnParams) return new ContractExpectFunctionResultEqualStrategy({ term })
    return new ContractExpectAnyEqualStrategy({ term })
  },
}
