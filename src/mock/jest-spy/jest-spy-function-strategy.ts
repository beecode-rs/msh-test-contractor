import { SubjectFromContract } from '../../subject/subject-strategy'
import { ContractTerm } from '../../types'
import { jestSpyService } from './jest-spy-service'
import { JestSpyStrategy } from './jest-spy-strategy'

export class JestSpyFunctionStrategy implements JestSpyStrategy {
  protected readonly _module: any
  protected readonly _subjectName: string
  protected readonly _fnName: string

  constructor({
    subjectFromContract: { module, subjectName },
    fnName,
  }: {
    subjectFromContract: SubjectFromContract
    fnName: string
  }) {
    this._module = module
    this._subjectName = subjectName
    this._fnName = fnName
  }

  public spyOnFunction(terms: ContractTerm[]): jest.SpyInstance {
    return jest.spyOn(this._module[this._subjectName], this._fnName).mockImplementation(jestSpyService.simpleMock(terms))
  }
}
