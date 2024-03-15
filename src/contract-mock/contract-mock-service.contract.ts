import { contractFactory } from '#src/contract/contractor-factory'
import mockJestEmptyStrategyContract from '#src/contract-mock/mock-jest-empty-strategy.contract'
import mockJestStrategyContract from '#src/contract-mock/mock-jest-strategy.contract'
import { mocker } from '#src/mocker/mocker'
import { ContractMockRevertFns } from '#src/types'

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
