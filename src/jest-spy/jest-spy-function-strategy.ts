import { ContractFnTerm } from '../types/index'
import { JestSpyStrategy } from './jest-spy-strategy'
import deepEqual from 'deep-equal'

export class JestSpyFunctionStrategy implements JestSpyStrategy {
  protected readonly _terms: ContractFnTerm[]

  constructor({ terms }: { terms: ContractFnTerm[] }) {
    this._terms = terms
  }

  public mockImplementationFactory(): (...args: any[]) => any {
    return (...mockParams: any[]): any => {
      const foundTerm = this._terms.find((term) => deepEqual(term.params, mockParams))
      if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)
      return foundTerm.result
    }
  }
}
