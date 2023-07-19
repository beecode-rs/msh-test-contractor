import { MockJestEmptyStrategy } from '#/contract-mock/mock-jest-empty-strategy'
import { MockJestStrategy } from '#/contract-mock/mock-jest-strategy'
import { MockStrategy } from '#/contract-mock/mock-strategy'
import { ContractMock } from '#/types/index'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockJestStrategy(mock)
		}

		return new MockJestEmptyStrategy()
	},
}
