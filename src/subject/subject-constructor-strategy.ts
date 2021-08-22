import { ContractFnTerm } from '../types'
import { SubjectFromContract, SubjectStrategy } from './subject-strategy'

export class SubjectConstructorStrategy implements SubjectStrategy {
  protected readonly _module: any
  protected readonly _subjectName: string

  constructor({ subjectFromContract: { module, subjectName } }: { subjectFromContract: SubjectFromContract }) {
    this._module = module
    this._subjectName = subjectName
  }

  public exec(term: ContractFnTerm): any {
    return new (this.fn())(...term.params)
  }
  public fn(): any {
    return this._module[this._subjectName]
  }
}
