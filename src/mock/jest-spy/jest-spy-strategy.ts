import { ContractTerm } from '../../types'

export interface JestSpyStrategy {
  spyOnFunction(terms: ContractTerm[]): jest.SpyInstance
}
