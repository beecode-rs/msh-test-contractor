import { MockVitestEmptyStrategy } from '#src/contract-mock/mock-vitest-empty-strategy'
import { MockVitestStrategy } from '#src/contract-mock/mock-vitest-strategy'
import { type MockStrategy } from '#src/contract-mock/mock-strategy'
import { type ContractMock } from '#src/types/index'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockVitestStrategy(mock)
		}

		return new MockVitestEmptyStrategy()
	},
}
