import { ContractTerm } from '../../types'
import { objectUtil } from '../../util/object-util'
import { ContractExpectStrategy } from './contract-expect-strategy'

export class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
  protected readonly _termResult: any

  constructor({ term }: { term: ContractTerm }) {
    this._termResult = term.result
  }

  public async test(fn: () => any): Promise<void> {
    const result = await fn()
    expect(objectUtil.stringifyOrNullUndefined(result)).toEqual(objectUtil.stringifyOrNullUndefined(this._termResult))
  }
}
