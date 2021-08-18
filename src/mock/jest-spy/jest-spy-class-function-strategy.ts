import { SubjectFomContract } from '../../subject/subject-strategy'
import { ContractTerm } from '../../types'
import { jestSpyService } from './jest-spy-service'
import { JestSpyStrategy } from './jest-spy-strategy'

export class JestSpyClassFunctionStrategy implements JestSpyStrategy {
  protected readonly _module: any
  protected readonly _subjectName: string
  protected readonly _fnName: string

  constructor({
    subjectFromContract: { module, subjectName },
    fnName,
  }: {
    subjectFromContract: SubjectFomContract
    fnName: string
  }) {
    this._module = module
    this._subjectName = subjectName
    this._fnName = fnName
  }

  public spyOn(terms: ContractTerm[]): jest.SpyInstance {
    // TODO check what happens if we want to mock two functions of the same object
    return jest.spyOn(this._module, this._subjectName).mockImplementation(jestSpyService.classMock(terms, this._fnName))
  }
}
