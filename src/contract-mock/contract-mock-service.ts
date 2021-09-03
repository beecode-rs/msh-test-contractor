import { ContractMock } from '../types/index'
import { MockJestEmptyStrategy } from './mock-jest-empty-strategy'
import { MockJestStrategy } from './mock-jest-strategy'
import { MockStrategy } from './mock-strategy'

export const contractMockService = {
  strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
    if (mock?.jest) return new MockJestStrategy(mock.jest)
    return new MockJestEmptyStrategy()
  },
}