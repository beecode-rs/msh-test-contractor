import { contractFactory } from '#/contract/contractor-factory.js'
import mockJestEmptyStrategyContract from '#/contract-mock/mock-jest-empty-strategy.contract.js'
import mockJestStrategyContract from '#/contract-mock/mock-jest-strategy.contract.js'
import { mocker } from '#/mocker/mocker.js'
import { ContractMockRevertFns } from '#/types/index.js'

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
