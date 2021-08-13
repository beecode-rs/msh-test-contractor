export type Contract = {
  subject: ContractSubject
  terms: ContractTerm[]
  mock?: ContractMock
}

export type ContractSubject = {
  fn: string
  source: any
  isConstructor?: boolean
}

export type ContractTerm = {
  params: any[]
  result: any
}

// TODO define mock object
export type ContractMock = {
  jest?: ContractMockJest
}

export type ContractMockJest = (jest: any, params: any[]) => ContractMockRevertFn
export type ContractMockRevertFn = () => void
