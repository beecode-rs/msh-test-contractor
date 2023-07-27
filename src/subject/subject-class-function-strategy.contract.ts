import { contractFactory } from 'src/contract/contractor-factory'
import { SpecialFnName } from 'src/enum/special-fn-name'
import { mocker } from 'src/mocker/mocker'
import { ContractMockRevertFns } from 'src/types'

class DummyClass {
	a(_a: string): string {
		return _a
	}
}

const dummyModule = { DummyClass }
const dummySubjectName = 'DummyClass'
const dummyFnName = 'a'
const dummyConstructorParams: any[] = []

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
