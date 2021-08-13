// import { SubjectSourceType } from './subject-source-type'

export type Contract = {
  subject: ContractSubject
  terms: ContractTerm[]
  mock?: any // TODO define mock object
}

export type ContractSubject = {
  fn: string
  source: any
  // sourceType: SubjectSourceType
  isConstructor?: boolean
}

export type ContractTerm = {
  params: any[]
  result: any
}
