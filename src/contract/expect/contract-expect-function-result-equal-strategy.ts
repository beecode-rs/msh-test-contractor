import { ContractTerm } from '../../types/index'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any
  protected readonly _termReturnFnParams: any

  constructor({ term }: { term: ContractTerm }) {
    this._termResult = term.result
    this._termReturnFnParams = term.returnFnParams
  }

  public test(fn: () => any): void {
    const result = fn()(...this._termReturnFnParams)
    expect(result).toEqual(this._termResult)
  }
}
