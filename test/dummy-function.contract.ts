import dummyClassContract from './dummy-class.contract'
import loggerContract from './logger.contract'
import { contractFactory } from '../src/contract/contractor-factory'
import { mocker } from '../src/mocker/mocker'
import { type ContractMockRevertFns } from '../src/types'

export default contractFactory(
	{
		mock: (): ContractMockRevertFns => {
			return [mocker.contract(loggerContract).mockRestore, mocker.contract(dummyClassContract).mockRestore]
		},
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		module: require('./dummy-function'),
		subjectName: 'dummyFunction',
	},
	{
		add: {
			terms: [
				{
					params: [1, 2],
					result: 3,
				},
			],
		},
		callClass: {
			terms: [
				{
					params: [1, 2, 3],
					result: 6,
				},
			],
		},
		callClassMultiFun: {
			terms: [
				{
					params: [1, 2, 3, 1],
					result: 8,
				},
			],
		},
		errorIfMoreThenTen: {
			terms: [
				{
					params: [1],
					result: 1,
				},
				{
					params: [11],
					result: new Error('More then 10'),
				},
			],
		},
		sub: {
			terms: [
				{
					params: [1, 2],
					result: -1,
				},
			],
		},
	}
)
