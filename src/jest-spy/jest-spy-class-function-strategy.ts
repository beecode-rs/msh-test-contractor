import { ContractTerm } from '../types'
import { JestSpyFunctionStrategy } from './jest-spy-function-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'
import deepEqual from 'deep-equal'

export class JestSpyClassFunctionStrategy implements JestSpyStrategy {
  protected readonly _terms: ContractTerm[]
  protected readonly _mockClassParams: any[]
  protected readonly _name: string

  constructor({ terms, mockClassParams, name }: { terms: ContractTerm[]; mockClassParams: any[]; name: string }) {
    this._terms = terms
    this._mockClassParams = mockClassParams
    this._name = name
  }

  public mockImplementationFactory(): (...args: any[]) => any {
    return (...mockParams: any[]): any => {
      const termByConstructorParams = this._terms.filter((term) => deepEqual(term.constructorParams, this._mockClassParams))

      const jestSpy = new JestSpyFunctionStrategy({ terms: termByConstructorParams, name: this._name })
      return jestSpy.mockImplementationFactory()(...mockParams)
    }
  }
}
