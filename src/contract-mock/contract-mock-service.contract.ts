import { contractFactory } from '#src/contract/contractor-factory.js'
import mockVitestEmptyStrategyContract from '#src/contract-mock/mock-vitest-empty-strategy.contract.js'
import mockVitestStrategyContract from '#src/contract-mock/mock-vitest-strategy.contract.js'
import { mocker } from '#src/mocker/mocker.js'
import { type ContractMockRevertFns } from '#src/types/index.js'

export default contractFactory(
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	{ module: require('./contract-mock-service.ts'), subjectName: 'contractMockService' },
	{
		strategyFromFunctionMock: {
			mock: (): ContractMockRevertFns => {
				return [mocker.contract(mockVitestStrategyContract), mocker.contract(mockVitestEmptyStrategyContract)].map(
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
