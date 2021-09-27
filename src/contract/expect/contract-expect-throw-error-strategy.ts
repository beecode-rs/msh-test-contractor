import { ContractTerm } from '../../types'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any

  constructor({ term }: { term: ContractTerm }) {
    this._termResult = term.result
  }

  public async test(fn: () => any): Promise<void> {
    expect(() => fn()).toThrow(this._termResult.message)
  }
}
