import { contractFactory } from '#/contract/contractor-factory.js'
import { SpecialFnName } from '#/enum/special-fn-name.js'
import { mocker } from '#/mocker/mocker.js'
import { ContractMockRevertFns } from '#/types/index.js'

class DummyClass {
	a(_a: string): string {
		return _a
	}
}

const dummyModule = { DummyClass }
const dummySubjectName = 'DummyClass'

const dummyConstructorParamsFactory = (): any[] => {
	return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }]
}

const selfContract = contractFactory(
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
