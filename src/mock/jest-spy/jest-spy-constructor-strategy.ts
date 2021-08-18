import { SubjectFomContract } from '../../subject/subject-strategy'
import { ContractTerm } from '../../types'
import { jestSpyService } from './jest-spy-service'
import { JestSpyStrategy } from './jest-spy-strategy'

export class JestSpyConstructorStrategy implements JestSpyStrategy {
  protected readonly _subjectName: string
  protected readonly _module: any

  constructor({ subjectFromContract: { module, subjectName } }: { subjectFromContract: SubjectFomContract }) {
    this._subjectName = subjectName
    this._module = module
  }

  public spyOn(terms: ContractTerm[]): jest.SpyInstance {
    return jest.spyOn(this._module, this._subjectName).mockImplementation(jestSpyService.simpleMock(terms))
  }
}
