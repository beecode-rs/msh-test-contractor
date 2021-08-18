import { ContractTerm } from '../types'
import { SubjectFomContract, SubjectStrategy } from './subject-strategy'

export class SubjectClassFunctionStrategy implements SubjectStrategy {
  protected readonly _module: any
  protected readonly _subjectName: string
  protected readonly _constructorParams: any[]
  protected readonly _fnName: string

  constructor({
    subjectFromContract: { module, subjectName },
    constructorParams,
    fnName,
  }: {
    subjectFromContract: SubjectFomContract
    constructorParams: any[]
    fnName: string
  }) {
    this._module = module
    this._subjectName = subjectName
    this._constructorParams = constructorParams
    this._fnName = fnName
  }

  public exec(term: ContractTerm): any {
    return new (this.fn())(...this._constructorParams)[this._fnName](...term.params)
  }
  public fn(): any {
    return this._module[this._subjectName]
  }
}
