import { contractFactory } from '#/contract/contractor-factory'
import { SpecialFnName } from '#/enum/special-fn-name'
import { mocker } from '#/mocker/mocker'
import { ContractMockRevertFns } from '#/types'

const dummyModule = {
	dummySubject: {
		a: (_a: string): string => _a,
	},
}

const dummyModuleFunction = { a: (_a: string): string => _a }
const dummySubjectName = 'dummySubject'
const dummyFnName = 'a'
const dummySelfFnName = SpecialFnName.SELF

const dummyConstructorParamsFactory = (): any[] => {
	return [{ fnName: dummyFnName, subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }]
}
const dummyConstructorFnParamsFactory = (): any[] => {
	return [{ fnName: dummySelfFnName, subjectFromContract: { module: dummyModuleFunction, subjectName: dummyFnName } }]
}

const selfContract = contractFactory(
	{ module: require('./subject-function-strategy'), subjectName: 'SubjectFunctionStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: dummyConstructorParamsFactory(),
					result: { _fnName: dummyFnName, _module: dummyModule, _subjectName: dummySubjectName },
				},
				{
					params: dummyConstructorFnParamsFactory(),
					result: { _fnName: dummySelfFnName, _module: dummyModuleFunction, _subjectName: dummyFnName },
				},
			],
		},
		exec: {
			mock: (): ContractMockRevertFns => {
				return [mocker.function(selfContract, 'fn').mockRestore]
			},
			terms: [
				{
					constructorParams: dummyConstructorParamsFactory(),
					params: [{ params: ['testParam'] }],
					result: 'testParam',
				},
				{
					constructorParams: dummyConstructorFnParamsFactory(),
					params: [{ params: ['testParam'] }],
					result: 'testParam',
				},
			],
		},
		fn: {
			terms: [
				{
					constructorParams: dummyConstructorParamsFactory(),
					params: [],
					result: dummyModule.dummySubject.a,
				},
				{
					constructorParams: dummyConstructorFnParamsFactory(),
					params: [],
					result: dummyModuleFunction.a,
				},
			],
		},
	}
)

export default selfContract
