import { contractFactory } from '#src/contract/contractor-factory.js'
import { SpecialFnName } from '#src/enum/special-fn-name.js'
import { type ContractMock } from '#src/types/index.js'

const dummyVitestMock: ContractMock = (_options) => {
	return []
}

export default contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./mock-vitest-strategy'), subjectName: 'MockVitestStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [],
					result: { _mock: undefined },
				},
				{
					params: [dummyVitestMock],
					result: { _mock: dummyVitestMock },
				},
			],
		},
	}
)
