import { ContractFnTerm } from '../../types'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any

  constructor({ term }: { term: ContractFnTerm }) {
    this._termResult = term.result
  }

  public test(fn: () => any): void {
    const result = fn()
    expect(result).toEqual(this._termResult)
  }
}
