import { functionService } from '../service/function-service'
import { SubjectStrategy } from './subject-strategy'

export class SubjectFunctionStrategy implements SubjectStrategy {
  protected readonly _name: string
  protected readonly _module: any
  protected readonly _fn: string
  constructor({ name, module, fn }: { name: string; module: any; fn: string }) {
    this._name = name
    this._module = module
    this._fn = fn
  }

  public exec(params: any[]): any {
    return this.fn()(...params)
  }

  public fn(): any {
    return functionService.extract({ module: this._module, fnPath: [this._name, this._fn].join('.') })
  }
}
