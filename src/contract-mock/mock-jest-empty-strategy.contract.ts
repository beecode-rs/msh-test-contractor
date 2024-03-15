import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'

export default contractFactory(
	{ module: require('./mock-jest-empty-strategy'), subjectName: 'MockJestEmptyStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [],
					result: {},
				},
				{
					params: [{ jest: [] }],
					result: { _jestMock: undefined },
				},
			],
		},
	}
)
