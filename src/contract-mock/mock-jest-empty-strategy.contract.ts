import { contractFactory } from '#/contract/contractor-factory.js'
import { SpecialFnName } from '#/enum/special-fn-name.js'

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
