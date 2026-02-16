import { contractFactory } from '#src/contract/contractor-factory.js'
import { SpecialFnName } from '#src/enum/special-fn-name.js'

export default contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./fn-util.js'), subjectName: 'fnUtil' },
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
