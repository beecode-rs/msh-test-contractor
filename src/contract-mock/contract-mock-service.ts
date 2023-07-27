import { MockJestEmptyStrategy } from 'src/contract-mock/mock-jest-empty-strategy'
import { MockJestStrategy } from 'src/contract-mock/mock-jest-strategy'
import { MockStrategy } from 'src/contract-mock/mock-strategy'
import { ContractMock } from 'src/types'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockJestStrategy(mock)
		}

		return new MockJestEmptyStrategy()
	},
}
