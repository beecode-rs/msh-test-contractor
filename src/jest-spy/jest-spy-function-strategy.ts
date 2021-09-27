import { ContractTerm } from '../types'
import { objectUtil } from '../util/object-util'
import { JestSpyStrategy } from './jest-spy-strategy'

export class JestSpyFunctionStrategy implements JestSpyStrategy {
  protected readonly _terms: ContractTerm[]
  protected readonly _name: string

  constructor({ terms, name }: { terms: ContractTerm[]; name: string }) {
    this._terms = terms
    this._name = name
  }

  public mockImplementationFactory(): jest.Mock {
    const fakeImplementation = (...mockParams: any[]): any => {
      const foundTerm = this._terms.find(
        (term) => objectUtil.stringifyOrNullUndefined(term.params) === objectUtil.stringifyOrNullUndefined(mockParams)
      )
      if (!foundTerm) throw new Error(`Unknown contract ${this._name} for params ${JSON.stringify(mockParams)}`)
      return foundTerm.result
    }
    return jest.fn().mockImplementation(fakeImplementation)
  }
}
