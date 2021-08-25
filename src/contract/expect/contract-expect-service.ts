import { ContractFnTerm } from '../../types'
import { ContractExpectAnyEqualStrategy } from './contract-expect-any-equal-strategy'
import { ContractExpectFunctionResultEqualStrategy } from './contract-expect-function-result-equal-strategy'
import { ContractExpectStrategy } from './contract-expect-strategy'

export const contractExpectService = {
  fromTerm: ({ result, term }: { result: any; term: ContractFnTerm }): ContractExpectStrategy => {
    if (term.returnFnParams) return new ContractExpectFunctionResultEqualStrategy({ result, term })
    return new ContractExpectAnyEqualStrategy({ result, term })
  },
}
