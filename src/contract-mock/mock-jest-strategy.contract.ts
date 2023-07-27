import { contractFactory } from 'src/contract/contractor-factory'
import { SpecialFnName } from 'src/enum/special-fn-name'
import { ContractMock } from 'src/types'

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
