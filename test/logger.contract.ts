import { contractFactory } from '../src/contract/contractor-factory'
import dateContract from '../src/global-contract/date.contract'
import { mocker } from '../src/mocker/mocker'
import { ContractMockRevertFns } from '../src/types'

const selfContract = contractFactory(
	{ module: require('./logger'), subjectName: 'logger' },
	{
		_message: {
			mock: (): ContractMockRevertFns => {
				return [mocker.contract(dateContract).mockRestore]
			},
			terms: [
				{
					params: ['type', 'test-message'],
					result: '2020-01-01T00:00:00.000Z:TYPE:test-message',
				},
				{
					params: ['DEBUG', 'test-message'],
					result: '2020-01-01T00:00:00.000Z:DEBUG:test-message',
				},
				{
					params: ['error', 'test-message'],
					result: '2020-01-01T00:00:00.000Z:ERROR:test-message',
				},
				{
					params: ['DEBUG', 'add 1 and 2'],
					result: '2020-01-01T00:00:00.000Z:DEBUG:add 1 and 2',
				},
				{
					params: ['DEBUG', 'sub 1 and 2'],
					result: '2020-01-01T00:00:00.000Z:DEBUG:sub 1 and 2',
				},
			],
		},
		debug: {
			mock: (): ContractMockRevertFns => {
				return [mocker.function(selfContract, '_message').mockRestore]
			},
			terms: [
				{
					params: ['test-message'],
					result: '2020-01-01T00:00:00.000Z:DEBUG:test-message',
				},
				{
					params: ['add 1 and 2'],
					result: '2020-01-01T00:00:00.000Z:DEBUG:add 1 and 2',
				},
				{
					params: ['sub 1 and 2'],
					result: '2020-01-01T00:00:00.000Z:DEBUG:sub 1 and 2',
				},
			],
		},
	}
)

export default selfContract
