import { AnyContract } from '../types'
import { MockerStrategy } from './mocker-strategy'

export class MockerJestFunctionStrategy implements MockerStrategy<jest.SpyInstance> {
  protected _spy?: jest.SpyInstance

  public constructor(protected _contract: AnyContract) {}

  public mockRestore(): void {
    if (this._spy) this._spy.mockRestore()
  }

  public contractSpy(): jest.SpyInstance {
    const { module, subjectName } = this._contract
    this._spy = jest.spyOn(module, subjectName)
    return this._spy
  }
}
