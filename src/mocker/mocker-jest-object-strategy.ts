import { AnyContract, ContractTerm } from '../types/index'
import { MockerStrategy } from './mocker-strategy'
import deepEqual from 'deep-equal'

export class MockerJestObjectStrategy implements MockerStrategy<{ [k: string]: (...args: any[]) => any }> {
  protected _spys: jest.SpyInstance[] = []

  public mockRestore(): void {
    this._spys.forEach((spy) => spy.mockRestore())
  }

  constructor(protected _contract: AnyContract) {}

  public contractSpy(): { [k: string]: (...args: any[]) => any } {
    return this._mockObject()
  }

  protected _mockObject(): { [k: string]: (...args: any[]) => any } {
    const { fn } = this._contract

    return Object.fromEntries(
      Object.entries(fn).map(([fnName, ctFunc]) => {
        return [fnName, this._mockFunction({ terms: ctFunc!.terms })]
      })
    )
  }

  protected _mockFunction({ terms }: { terms: ContractTerm[] }): (...args: any[]) => any {
    return (...mockParams: any[]): any => {
      const foundTerm = terms.find((term) => deepEqual(term.params, mockParams))
      if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)

      // TODO what to do if we expect error to be return, should we throw it
      // if (foundTerm instanceof Error) throw foundTerm.result

      return foundTerm.result
    }
  }
}
