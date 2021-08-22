export type PropType<T, P extends keyof T> = T[P]

export type Contract<
  MODULE,
  SUBJECT_NAME extends Extract<keyof MODULE, string>,
  SUBJECT extends PropType<MODULE, SUBJECT_NAME>
> = {
  module: MODULE
  subjectName: SUBJECT_NAME
} & {
  fns: Partial<ContractFunctions<SUBJECT>>
}

export type AnyContract = Contract<any, any, any>

export type ContractFunctions<SUBJECT> = { [key in Extract<keyof SUBJECT, string>]: ContractFunction } & {
  _constructor: ContractFunction
} & { [k: string]: ContractFunction }

export type ContractFunction = {
  terms: ContractTerm[]
  mock?: ContractMock
}

export type ContractTerm = {
  params: any[]
  result: any
  constructorParams?: any[]
}

// TODO define mock object
export type ContractMock = {
  jest?: ContractMockJest
}

export type ContractMockJest = (jest: any, options: { params?: any[] }) => ContractMockRevertFns
export type ContractMockRevertFn = () => void
export type ContractMockRevertFns = ContractMockRevertFn[]
