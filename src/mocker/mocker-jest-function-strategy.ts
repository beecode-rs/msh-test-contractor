import { AnyContract } from '../types/index'
import { MockerStrategy } from './mocker-strategy'

export class MockerJestFunctionStrategy implements MockerStrategy<jest.SpyInstance> {
  protected _spy?: jest.SpyInstance

  constructor(protected _contract: AnyContract) {}

  public mockRestore(): void {
    if (this._spy) this._spy.mockRestore()
  }

  public contractSpy(): jest.SpyInstance {
    this._spy = jest.spyOn(this._contract.module, this._contract.subjectName)
    return this._spy
  }
}
