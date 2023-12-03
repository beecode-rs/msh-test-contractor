import { contractFactory } from '#/contract/contractor-factory'
import mockJestEmptyStrategyContract from '#/contract-mock/mock-jest-empty-strategy.contract'
import mockJestStrategyContract from '#/contract-mock/mock-jest-strategy.contract'
import { mocker } from '#/mocker/mocker'
import { ContractMockRevertFns } from '#/types'

export default contractFactory(
	{ module: require('./contract-mock-service.ts'), subjectName: 'contractMockService' },
	{
		strategyFromFunctionMock: {
			mock: (): ContractMockRevertFns => {
				return [mocker.contract(mockJestStrategyContract), mocker.contract(mockJestEmptyStrategyContract)].map(
					(f) => f.mockRestore
				)
			},
			terms: [
				{
					params: [],
					result: {},
				},
			],
		},
	}
)
