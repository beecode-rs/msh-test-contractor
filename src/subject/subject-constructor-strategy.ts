import { ContractSubject } from '../contract-type/contract'
import { functionService } from '../service/function-service'
import { SubjectStrategy } from './subject-strategy'

export class SubjectConstructorStrategy implements SubjectStrategy {
  constructor(protected readonly _subject: ContractSubject) {}

  public exec(params: any[]): any {
    return new (this.fn())(...params)
  }

  public fn(): any {
    return functionService.extract(this._subject.source, this._subject.fn)
  }
}
