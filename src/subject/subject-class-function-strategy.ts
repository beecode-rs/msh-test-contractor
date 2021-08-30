import { ContractFnTerm } from '../types'
import { SubjectFromContract, SubjectStrategy } from './subject-strategy'

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
    subjectFromContract: SubjectFromContract
    constructorParams: any[]
    fnName: string
  }) {
    this._module = module
    if (!subjectName) throw new Error('Subject name must be specified for class functions strategy')
    this._subjectName = subjectName
    this._constructorParams = constructorParams
    this._fnName = fnName
  }

  public exec(term: ContractFnTerm): any {
    return new (this.fn())(...this._constructorParams)[this._fnName](...term.params)
  }
  public fn(): any {
    return this._module[this._subjectName]
  }
}
