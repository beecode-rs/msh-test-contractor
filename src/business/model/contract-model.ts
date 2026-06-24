/* istanbul ignore file */
import { type SpecialFnName } from '#src/business/model/special-fn-name.js'

export type PropType<T, P extends keyof T> = T[P]

export type Contract<
	MODULE,
	SUBJECT_NAME extends Extract<keyof MODULE, string>,
	SUBJECT extends PropType<MODULE, SUBJECT_NAME>,
> = {
	module: MODULE
	subjectName: SUBJECT_NAME
	mock?: ContractMock
	fns: ContractFns<SUBJECT>
}

export type AnyContract = Contract<any, any, any> // eslint-disable-line @typescript-eslint/no-explicit-any

export type ContractFns<SUBJECT> = Partial<
	Record<Extract<keyof SUBJECT, string>, ContractFunction> &
		Record<SpecialFnName, ContractFunction> &
		Record<string, ContractFunction>
>

export type ContractFunction = {
	terms: ContractTerm[]
	mock?: ContractMock
}

export type ContractTerm = {
	params: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
	result: any // eslint-disable-line @typescript-eslint/no-explicit-any
	constructorParams?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
	returnFnParams?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}

// TODO define mock object
export type ContractMock = (options?: { params?: any[] }) => ContractMockRevertFns // eslint-disable-line @typescript-eslint/no-explicit-any

export type ContractMockRevertFn = () => void

export type ContractMockRevertFns = ContractMockRevertFn[]
