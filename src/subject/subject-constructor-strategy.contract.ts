import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'
import { mocker } from '#src/mocker/mocker'
import { type ContractMockRevertFns } from '#src/types/index'

class DummyClass {
	a(_a: string): string {
		return _a
	}
}

const dummyModule = { DummyClass }
const dummySubjectName = 'DummyClass'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dummyConstructorParamsFactory = (): any[] => {
	return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }]
}

const selfContract = contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./subject-constructor-strategy'), subjectName: 'SubjectConstructorStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: dummyConstructorParamsFactory(),
					result: { _module: dummyModule, _subjectName: dummySubjectName },
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
					params: [{ params: [] }],
					result: new DummyClass(),
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
