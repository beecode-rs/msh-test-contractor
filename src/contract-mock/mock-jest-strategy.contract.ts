import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'
import { type ContractMock } from '#src/types/index'

const dummyJestMock: ContractMock = (_options) => {
	return []
}

export default contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
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
