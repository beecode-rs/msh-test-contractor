import { ContractTerm } from '../../types'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any
  protected readonly _termReturnFnParams: any

  constructor({ term }: { term: ContractTerm }) {
    this._termResult = term.result
    this._termReturnFnParams = term.returnFnParams
  }

  public async test(fn: () => any): Promise<void> {
    const result = fn()(...this._termReturnFnParams)
    expect(await result).toEqual(this._termResult)
  }
}
