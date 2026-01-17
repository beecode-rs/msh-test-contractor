import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'

const dummyContract = { dummy: 'contract' }

export default contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./mocker-vitest-object-strategy'), subjectName: 'MockerVitestObjectStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [dummyContract],
					result: { _contract: dummyContract, _spies: [] },
				},
			],
		},
	}
)
