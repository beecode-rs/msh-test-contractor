import { SpecialFnName } from '../enum/special-fn-name'
import { ContractTerm } from '../types'
import { SubjectFromContract, SubjectStrategy } from './subject-strategy'

export class SubjectFunctionStrategy implements SubjectStrategy {
  protected readonly _subjectName: string
  protected readonly _module: any
  protected readonly _fnName: string

  constructor({
    subjectFromContract: { module, subjectName },
    fnName,
  }: {
    subjectFromContract: SubjectFromContract
    fnName: string
  }) {
    this._subjectName = subjectName
    this._module = module
    this._fnName = fnName
  }

  public exec(term: ContractTerm): any {
    const func = this.fn()
    return func(...term.params)
  }

  public fn(): any {
    return this._fnName === SpecialFnName.SELF ? this._module[this._subjectName] : this._module[this._subjectName][this._fnName]
  }
}
