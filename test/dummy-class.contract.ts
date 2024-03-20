import dummyFunctionContract from './dummy-function.contract'
import { contractFactory } from '../src/contract/contractor-factory'
import { SpecialFnName } from '../src/enum/special-fn-name'
import { mocker } from '../src/mocker/mocker'
import { ContractMockRevertFns } from '../src/types'

export default contractFactory(
	{ module: require('./dummy-class'), subjectName: 'DummyClass' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [1, 2],
					result: { __a: 1, __b: 2 },
				},
			],
		},
		add: {
			terms: [
				{
					constructorParams: [1, 2],
					params: [3],
					result: 6,
				},
			],
		},
		externalAdd: {
			mock: (): ContractMockRevertFns => {
				return [mocker.contract(dummyFunctionContract).mockRestore]
			},
			terms: [
				{
					constructorParams: [1, 2],
					params: [3],
					result: 6,
				},
			],
		},
		sub: {
			terms: [
				{
					constructorParams: [1, 2],
					params: [1],
					result: 2,
				},
			],
		},
	}
)
