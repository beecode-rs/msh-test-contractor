import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { AnyContract } from '../types/index'
import { MockerStrategy } from './mocker-strategy'

export type MockerJestObjectResult = { [k: string]: jest.Mock }

export class MockerJestObjectStrategy implements MockerStrategy<MockerJestObjectResult> {
  protected _spies: jest.SpyInstance[] = []

  constructor(protected _contract: AnyContract) {}

  public mockRestore(): void {
    this._spies.forEach((spy) => spy.mockRestore())
  }

  public contractSpy(): MockerJestObjectResult {
    return this._mockObject()
  }

  protected _mockObject(): MockerJestObjectResult {
    return Object.fromEntries(
      Object.entries(this._contract.fns).map(([fnName, ctFunc]) => {
        const jestSpyFunction = new JestSpyFunctionStrategy({ terms: ctFunc!.terms })
        return [fnName, jestSpyFunction.mockImplementationFactory()]
      })
    )
  }
}
