import { AnyContract, ContractFnTerm } from '../types'

export type SubjectFromContract = Pick<AnyContract, 'subjectName' | 'module'>

export interface SubjectStrategy {
  exec: (term: ContractFnTerm) => any
  fn: () => any
}
