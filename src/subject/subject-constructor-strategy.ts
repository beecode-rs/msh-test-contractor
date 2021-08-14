import { functionService } from '../service/function-service'
import { SubjectStrategy } from './subject-strategy'

export class SubjectConstructorStrategy implements SubjectStrategy {
  protected readonly _name: string
  protected readonly _module: any
  constructor({ name, module }: { name: string; module: any }) {
    this._name = name
    this._module = module
  }

  public exec(params: any[]): any {
    return new (this.fn())(...params)
  }

  public fn(): any {
    return functionService.extract({ module: this._module, fnPath: [this._name].join('.') })
  }
}
