import { contractFactory } from '#src/contract/contractor-factory'
import mockVitestEmptyStrategyContract from '#src/contract-mock/mock-vitest-empty-strategy.contract'
import mockVitestStrategyContract from '#src/contract-mock/mock-vitest-strategy.contract'
import { mocker } from '#src/mocker/mocker'
import { type ContractMockRevertFns } from '#src/types/index'

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
