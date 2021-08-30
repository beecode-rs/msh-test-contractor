export type PropType<T, P extends keyof T> = T[P]

export type Contract<
  MODULE,
  SUBJECT_NAME extends Extract<keyof MODULE, string>,
  SUBJECT extends PropType<MODULE, SUBJECT_NAME>
> = {
  module: MODULE
  subjectName?: SUBJECT_NAME
  fns: ContractFns<SUBJECT>
}

export type AnyContract = Contract<any, any, any>

export type ContractFns<SUBJECT> = Partial<
  { [key in Extract<keyof SUBJECT, string>]: ContractFn } & {
    _constructor: ContractFn
    [k: string]: ContractFn
  }
>

export type ContractFn = {
  terms: ContractFnTerm[]
  mock?: ContractFnMock
}

export type ContractFnTerm = {
  params: any[]
  result: any
  constructorParams?: any[]
  returnFnParams?: any[]
}

// TODO define mock object
export type ContractFnMock = {
  jest?: ContractJestMock
}
export type ContractJestMock = (jest: any, options: { params?: any[] }) => ContractMockRevertFns

export type ContractMockRevertFn = () => void
export type ContractMockRevertFns = ContractMockRevertFn[]
