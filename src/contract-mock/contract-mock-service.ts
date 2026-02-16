import { type MockStrategy } from '#src/contract-mock/mock-strategy.js'
import { MockVitestEmptyStrategy } from '#src/contract-mock/mock-vitest-empty-strategy.js'
import { MockVitestStrategy } from '#src/contract-mock/mock-vitest-strategy.js'
import { type ContractMock } from '#src/types/index.js'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockVitestStrategy(mock)
		}

		return new MockVitestEmptyStrategy()
	},
}
