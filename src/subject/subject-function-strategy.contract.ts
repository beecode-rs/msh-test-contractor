import { contractFactory } from '#src/contract/contractor-factory.js'
import { SpecialFnName } from '#src/enum/special-fn-name.js'
import { mocker } from '#src/mocker/mocker.js'
import { type ContractMockRevertFns } from '#src/types/index.js'

const dummyModule = {
	dummySubject: {
		a: (_a: string): string => _a,
	},
}

const dummyModuleFunction = { a: (_a: string): string => _a }
const dummySubjectName = 'dummySubject'
const dummyFnName = 'a'
const dummySelfFnName = SpecialFnName.SELF

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dummyConstructorParamsFactory = (): any[] => {
	return [{ fnName: dummyFnName, subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dummyConstructorFnParamsFactory = (): any[] => {
	return [{ fnName: dummySelfFnName, subjectFromContract: { module: dummyModuleFunction, subjectName: dummyFnName } }]
}

const selfContract = contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
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
