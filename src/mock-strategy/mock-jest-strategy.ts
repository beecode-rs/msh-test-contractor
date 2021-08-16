import { ContractMockJest, ContractMockRevertFns } from '../types/index'
import { MockStrategy } from './mock-strategy'

export class MockJestStrategy implements MockStrategy {
  protected _restoreMockFn?: ContractMockRevertFns

  constructor(protected readonly _jestMock?: ContractMockJest) {}

  public mock({ params }: { params?: any[] }): void {
    this._restoreMockFn = this._jestMock ? this._jestMock(jest, { params }) : []
  }

  public restore(): void {
    if (this._restoreMockFn) this._restoreMockFn?.forEach((rf) => rf())
  }
}
