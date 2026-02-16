import { contractFactory } from '#src/contract/contractor-factory.js'
import { SpecialFnName } from '#src/enum/special-fn-name.js'
import { mocker } from '#src/mocker/mocker.js'
import { type ContractMockRevertFns } from '#src/types/index.js'

class DummyClass {
	a(_a: string): string {
		return _a
	}
}

const dummyModule = { DummyClass }
const dummySubjectName = 'DummyClass'
const dummyFnName = 'a'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dummyConstructorParams: any[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dummyConstructorParamsFactory = (): any[] => {
	return [
		{
			constructorParams: dummyConstructorParams,
			fnName: dummyFnName,
			subjectFromContract: { module: dummyModule, subjectName: dummySubjectName },
		},
	]
}

const selfContract = contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./subject-class-function-strategy'), subjectName: 'SubjectClassFunctionStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: dummyConstructorParamsFactory(),
					result: {
						_constructorParams: dummyConstructorParams,
						_fnName: dummyFnName,
						_module: dummyModule,
						_subjectName: dummySubjectName,
					},
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
					params: [{ params: ['testString'] }],
					result: 'testString',
				},
			],
		},

		fn: {
			terms: [
				{
					constructorParams: dummyConstructorParamsFactory(),
					params: [],
					result: DummyClass,
				},
			],
		},
	}
)

export default selfContract
