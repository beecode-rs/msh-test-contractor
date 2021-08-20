import { ContractMock } from '../types'
import { MockEmptyStrategy } from './mock-empty-strategy'
import { MockJestStrategy } from './mock-jest-strategy'
import { MockStrategy } from './mock-strategy'

export const mockService = {
  strategyFromFunctionMock: (mock?: ContractMock): MockStrategy => {
    if (mock?.jest) return new MockJestStrategy(mock.jest)
    return new MockEmptyStrategy()
  },
}
