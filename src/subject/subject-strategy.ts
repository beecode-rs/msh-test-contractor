import { AnyContract } from '../types'

export type SubjectFomContract = Pick<AnyContract, 'subjectName' | 'module'>

export interface SubjectStrategy {
  exec: (params: any[]) => any
  fn: () => any
}
