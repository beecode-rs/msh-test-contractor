import { contractFactory } from '#/contract/contractor-factory'
import { SpecialFnName } from '#/enum/special-fn-name'
import { ContractMock } from '#/types/index'

const dummyJestMock: ContractMock = (_options) => {
	return []
}

export default contractFactory(
	{ module: require('./mock-jest-strategy'), subjectName: 'MockJestStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [],
					result: { _mock: undefined },
				},
				{
					params: [dummyJestMock],
					result: { _mock: dummyJestMock },
				},
			],
		},
	}
)
