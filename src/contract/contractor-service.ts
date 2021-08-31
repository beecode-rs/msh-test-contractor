import { ContractFnTerm } from '../types/index'

export const contractorService = {
  testDescription: ({ fnName }: { fnName: string }): string => {
    return `${fnName} [contract]`
  },
  testName: ({ term: { params, result } }: { term: ContractFnTerm }): string => {
    return `input: ${JSON.stringify(params)}   output: ${JSON.stringify(result)}`
  },
}
