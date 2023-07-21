import { contractFactory } from '#/contract/contractor-factory.js'
import { SpecialFnName } from '#/enum/special-fn-name.js'

export default contractFactory(
	{ module: require('./fn-util'), subjectName: 'fnUtil' },
	{
		isConstructor: {
			terms: [
				{
					params: ['someFnName'],
					result: false,
				},
				{
					params: [SpecialFnName.CONSTRUCTOR],
					result: true,
				},
			],
		},
	}
)
