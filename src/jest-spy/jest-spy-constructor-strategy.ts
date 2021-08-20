import { SubjectFromContract } from '../subject/subject-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'

export class JestSpyConstructorStrategy implements JestSpyStrategy {
  protected readonly _subjectName: string
  protected readonly _module: any

  constructor({ subjectFromContract: { module, subjectName } }: { subjectFromContract: SubjectFromContract }) {
    this._subjectName = subjectName
    this._module = module
  }

  public mockImplementation(): (...args: any[]) => any {
    // return jest.spyOn(this._module, this._subjectName).mockImplementation(jestSpyService.simpleMock(terms))
    throw new Error('not implemented')
  }
}
