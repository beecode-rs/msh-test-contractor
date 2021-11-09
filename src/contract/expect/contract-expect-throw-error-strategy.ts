import { ContractTerm } from '../../types'
import { ContractExpectStrategy } from './contract-expect-service'

export class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any

  constructor(params: { term: ContractTerm }) {
    const { term } = params
    this._termResult = term.result
  }

  public async test(fn: () => any): Promise<void> {
    expect(() => fn()).toThrow(this._termResult.message)
  }
}
