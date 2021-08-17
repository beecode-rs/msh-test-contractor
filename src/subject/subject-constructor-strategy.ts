import { ContractTerm } from '../types/index'
import { SubjectFomContract, SubjectStrategy } from './subject-strategy'

export class SubjectConstructorStrategy implements SubjectStrategy {
  protected readonly _module: any
  protected readonly _subjectName: string

  constructor({ subjectFromContract: { module, subjectName } }: { subjectFromContract: SubjectFomContract }) {
    this._module = module
    this._subjectName = subjectName
  }

  public exec(term: ContractTerm): any {
    return new (this.fn())(...term.params)
  }
  public fn(): any {
    return this._module[this._subjectName]
  }
}
