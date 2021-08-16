import { SubjectStrategy } from './subject-strategy'

export class SubjectConstructorStrategy implements SubjectStrategy {
  protected readonly _module: any
  protected readonly _subjectName: any
  constructor({ module, subjectName }: { module: any; subjectName: string }) {
    this._module = module
    this._subjectName = subjectName
  }

  public exec(params: any[]): any {
    return new (this.fn())(...params)
  }

  public fn(): any {
    return this._module[this._subjectName]
  }
}
