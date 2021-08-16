export type PropType<T, P extends Extract<keyof T, string>> = T[P]

export type Contract<MODULE, SUBJECT_NAME extends string, SUBJECT extends PropType<MODULE, SUBJECT_NAME>> = {
  module: MODULE
  subjectName: SUBJECT_NAME
} & {
  fn: Partial<ContractFunctions<SUBJECT>>
}

export type ContractFunctions<SUBJECT> = { [key in Extract<keyof SUBJECT, string>]: ContractFunction } & {
  _constructor: ContractFunction
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

export type ContractMockJest = (jest: any, options: { params?: any[] }) => ContractMockRevertFns
export type ContractMockRevertFn = () => void
export type ContractMockRevertFns = ContractMockRevertFn[]
