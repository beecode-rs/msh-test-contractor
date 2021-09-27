import { ContractMock } from '../types'
import { MockJestEmptyStrategy } from './mock-jest-empty-strategy'
import { MockJestStrategy } from './mock-jest-strategy'
import { MockStrategy } from './mock-strategy'

export const contractMockService = {
  strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
    if (mock) return new MockJestStrategy(mock)
    return new MockJestEmptyStrategy()
  },
}
