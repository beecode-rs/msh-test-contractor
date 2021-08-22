import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { AnyContract } from '../types'
import { MockerStrategy } from './mocker-strategy'

export class MockerJestObjectStrategy implements MockerStrategy<{ [k: string]: (...args: any[]) => any }> {
  protected _spies: jest.SpyInstance[] = []

  constructor(protected _contract: AnyContract) {}

  public mockRestore(): void {
    this._spies.forEach((spy) => spy.mockRestore())
  }

  public contractSpy(): { [k: string]: (...args: any[]) => any } {
    return this._mockObject()
  }

  protected _mockObject(): { [k: string]: (...args: any[]) => any } {
    const { fns } = this._contract

    return Object.fromEntries(
      Object.entries(fns).map(([fnName, ctFunc]) => {
        const jestSpyFunction = new JestSpyFunctionStrategy({ terms: ctFunc!.terms })
        return [fnName, jestSpyFunction.mockImplementation()]
      })
    )
  }
}
