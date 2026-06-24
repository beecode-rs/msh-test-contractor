import { type MockStrategy } from '#src/business/component/contractor-mock/contractor-mock-strategy.js'
import { MockVitestEmptyStrategy } from '#src/business/component/contractor-mock/contractor-mock-vitest-empty-strategy.js'
import { MockVitestStrategy } from '#src/business/component/contractor-mock/contractor-mock-vitest-strategy.js'
import { type ContractMock } from '#src/business/model/contract-model.js'

export const contractMockService = {
	strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
		if (mock) {
			return new MockVitestStrategy(mock)
		}

		return new MockVitestEmptyStrategy()
	},
}
