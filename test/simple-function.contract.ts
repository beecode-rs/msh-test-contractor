import * as simpleFunction from './simple-function'
import { contractFactory } from '../src/contract/contractor-factory'
import { SpecialFnName } from '../src/enum/special-fn-name'

export default contractFactory(
	{ module: simpleFunction, subjectName: 'simpleFunction' },
	{
		[SpecialFnName.SELF]: {
			terms: [
				{
					params: [1],
					result: 1,
				},
				{
					params: [11],
					result: new Error('number is greater than ten'),
				},
			],
		},
	}
)
