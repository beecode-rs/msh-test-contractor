import { ContractMockJest, ContractMockRevertFn } from '../contract-type/contract'
import { MockStrategy } from './mock-strategy'

export class MockJestStrategy implements MockStrategy {
  protected _restoreMockFn?: ContractMockRevertFn

  constructor(protected readonly _jestMock?: ContractMockJest) {}

  public mock({ params }: { params?: any[] }): void {
    this._restoreMockFn = this._jestMock && this._jestMock(jest, { params })
  }

  public restore(): void {
    if (this._restoreMockFn) this._restoreMockFn()
  }
}
