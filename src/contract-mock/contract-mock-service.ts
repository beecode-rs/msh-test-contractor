import { MockJestEmptyStrategy } from '#src/contract-mock/mock-jest-empty-strategy'
import { MockJestStrategy } from '#src/contract-mock/mock-jest-strategy'
import { type MockStrategy } from '#src/contract-mock/mock-strategy'
import { type ContractMock } from '#src/types/index'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockJestStrategy(mock)
		}

		return new MockJestEmptyStrategy()
	},
}
