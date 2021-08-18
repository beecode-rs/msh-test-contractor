import { ContractTerm } from '../../types'

export interface JestSpyStrategy {
  spyOn(terms: ContractTerm[]): jest.SpyInstance
}
