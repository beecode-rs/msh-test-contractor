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
    return this.fn()(...term.params)
  }

  public fn(): any {
    return this._module[this._subjectName][this._fnName]
  }
}
