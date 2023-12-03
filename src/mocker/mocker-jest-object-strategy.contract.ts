import { contractFactory } from '#/contract/contractor-factory'
import { SpecialFnName } from '#/enum/special-fn-name'

const dummyContract = { dummy: 'contract' }

export default contractFactory(
	{ module: require('./mocker-jest-object-strategy'), subjectName: 'MockerJestObjectStrategy' },
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
