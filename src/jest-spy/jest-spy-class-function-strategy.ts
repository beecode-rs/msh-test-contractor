import { ContractFnTerm } from '../types'
import { JestSpyStrategy } from './jest-spy-strategy'
import deepEqual from 'deep-equal'

export class JestSpyClassFunctionStrategy implements JestSpyStrategy {
  protected readonly _terms: ContractFnTerm[]
  protected readonly _mockClassParams: any[]
  protected readonly _fnName: string

  constructor({ terms, fnName, mockClassParams }: { terms: ContractFnTerm[]; fnName: string; mockClassParams: any[] }) {
    this._terms = terms
    this._mockClassParams = mockClassParams
    this._fnName = fnName
  }

  public mockImplementation(): (...args: any[]) => any {
    return (...mockParams: any[]): any => {
      const foundTerm = this._terms.find(
        (term) => deepEqual(term.constructorParams, this._mockClassParams) && deepEqual(term.params, mockParams)
      )
      if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)

      // TODO what to do if we expect error to be return, should we throw it
      // if (foundTerm instanceof Error) throw foundTerm.result

      return foundTerm.result
    }
  }
}
