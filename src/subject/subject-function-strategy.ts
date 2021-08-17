import { SubjectFomContract, SubjectStrategy } from './subject-strategy'

export class SubjectFunctionStrategy implements SubjectStrategy {
  protected readonly _subjectName: string
  protected readonly _module: any
  protected readonly _fnName: string

  constructor({
    subjectFromContract: { module, subjectName },
    fnName,
  }: {
    subjectFromContract: SubjectFomContract
    fnName: string
  }) {
    this._subjectName = subjectName
    this._module = module
    this._fnName = fnName
  }

  public exec(params: any[]): any {
    return this.fn()(...params)
  }

  public fn(): any {
    return this._module[this._subjectName][this._fnName]
  }
}