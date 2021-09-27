import { ContractTerm } from '../types'

export const contractorService = {
  testDescription: ({ fnName }: { fnName: string }): string => {
    return `${fnName} [contract]`
  },
  testName: ({ term: { params, result } }: { term: ContractTerm }): string => {
    return `input: ${JSON.stringify(params)}   output: ${JSON.stringify(result)}`
  },
}
