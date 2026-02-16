import { contractFactory } from '#src/contract/contractor-factory.js'
import { mocker } from '#src/mocker/mocker.js'
import { type ContractMockRevertFns } from '#src/types/index.js'

const selfContract = contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./src/util/type-util'), subjectName: 'typeUtil' },
	{
		isClass: {
			mock: (): ContractMockRevertFns => {
				return [mocker.function(selfContract, 'isObject').mockRestore, mocker.function(selfContract, 'isFunction').mockRestore]
			},
			terms: [
				{
					params: [Date],
					result: true,
				},
				{
					params: [{}],
					result: false,
				},
			],
		},
		isFunction: {
			terms: [
				{
					params: [Date],
					result: true,
				},
				{
					params: [{}],
					result: false,
				},
				{
					params: [
						(): void => {
							return
						},
					],
					result: true,
				},
			],
		},
		isObject: {
			terms: [
				{
					params: [Date],
					result: true,
				},
				{
					params: [{}],
					result: true,
				},
				{
					params: [1],
					result: false,
				},
			],
		},
	}
)

export default selfContract
