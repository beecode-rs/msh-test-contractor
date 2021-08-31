import { ContractFnTerm } from '../../types/index'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any

  constructor({ term }: { term: ContractFnTerm }) {
    this._termResult = term.result
  }

  public test(fn: () => any): void {
    expect(() => fn()).toThrow(this._termResult.message)
  }
}
