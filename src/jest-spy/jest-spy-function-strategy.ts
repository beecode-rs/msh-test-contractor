import { ContractTerm } from '../types/index'
import { JestSpyStrategy } from './jest-spy-strategy'
import deepEqual from 'deep-equal'

export class JestSpyFunctionStrategy implements JestSpyStrategy {
  protected readonly _terms: ContractTerm[]

  constructor({ terms }: { terms: ContractTerm[] }) {
    this._terms = terms
  }

  public mockImplementation(): (...args: any[]) => any {
    return (...mockParams: any[]): any => {
      const foundTerm = this._terms.find((term) => deepEqual(term.params, mockParams))
      if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)

      // TODO what to do if we expect error to be return, should we throw it
      // if (foundTerm instanceof Error) throw foundTerm.result

      return foundTerm.result
    }
  }
}
