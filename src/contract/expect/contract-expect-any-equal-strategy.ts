import { ContractFnTerm } from '../../types'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
  protected readonly _result: any
  protected readonly _termResult: any

  constructor({ result, term }: { result: any; term: ContractFnTerm }) {
    this._result = result
    this._termResult = term.result
  }

  public test(): void {
    expect(this._result).toEqual(this._termResult)
  }
}
