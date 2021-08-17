import { AnyContract, ContractTerm } from '../types'

export type SubjectFomContract = Pick<AnyContract, 'subjectName' | 'module'>

export interface SubjectStrategy {
  exec: (term: ContractTerm) => any
  fn: () => any
}
