import { ContractMock, ContractMockRevertFns } from '../types'
import { MockStrategy } from './mock-strategy'

export class MockJestStrategy implements MockStrategy {
  protected _restoreMockFn?: ContractMockRevertFns

  constructor(protected readonly _mock?: ContractMock) {}

  public mock(mockParams: { params?: any[] } = {}): void {
    const { params } = mockParams
    this._restoreMockFn = this._mock ? this._mock({ params }) : []
  }

  public restore(): void {
    if (this._restoreMockFn) this._restoreMockFn.forEach((rf) => rf())
  }
}
