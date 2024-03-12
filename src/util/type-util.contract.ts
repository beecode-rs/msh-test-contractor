import { contractFactory } from '#/contract/contractor-factory'
import { mocker } from '#/mocker/mocker'
import { ContractMockRevertFns } from '#/types'

const selfContract = contractFactory(
	{ module: require('.//src/util/type-util'), subjectName: 'typeUtil' },
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
