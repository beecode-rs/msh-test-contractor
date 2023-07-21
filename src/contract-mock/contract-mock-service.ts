import { MockJestEmptyStrategy } from '#/contract-mock/mock-jest-empty-strategy.js'
import { MockJestStrategy } from '#/contract-mock/mock-jest-strategy.js'
import { MockStrategy } from '#/contract-mock/mock-strategy.js'
import { ContractMock } from '#/types/index.js'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockJestStrategy(mock)
		}

		return new MockJestEmptyStrategy()
	},
}
