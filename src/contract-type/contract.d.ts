export type Contract = {
  name: string
  module: any
  fn: { [k: string]: ContractFunction }
}

export type ContractFunction = {
  terms: ContractTerm[]
  mock?: ContractMock
}

export type ContractTerm = {
  params: any[]
  result: any
}

// TODO define mock object
export type ContractMock = {
  jest?: ContractMockJest
}

export type ContractMockJest = (jest: any, options: { params?: any[] }) => ContractMockRevertFn
export type ContractMockRevertFn = () => void
