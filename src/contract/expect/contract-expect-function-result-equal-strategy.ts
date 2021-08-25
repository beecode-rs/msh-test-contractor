import { ContractFnTerm } from '../../types'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
  protected readonly _result: any
  protected readonly _termResult: any
  protected readonly _termReturnFnParams: any

  constructor({ result, term }: { result: any; term: ContractFnTerm }) {
    this._result = result
    this._termResult = term.result
    this._termReturnFnParams = term.returnFnParams
  }

  public test(): void {
    expect(this._result(...this._termReturnFnParams)).toEqual(this._termResult)
  }
}
