import { ContractTerm } from '../types/index'
import { JestSpyFunctionStrategy } from './jest-spy-function-strategy'
import { JestSpyStrategy } from './jest-spy-strategy'
import deepEqual from 'deep-equal'

export class JestSpyClassFunctionStrategy implements JestSpyStrategy {
  protected readonly _terms: ContractTerm[]
  protected readonly _mockClassParams: any[]

  constructor({ terms, mockClassParams }: { terms: ContractTerm[]; mockClassParams: any[] }) {
    this._terms = terms
    this._mockClassParams = mockClassParams
  }

  public mockImplementationFactory(): (...args: any[]) => any {
    return (...mockParams: any[]): any => {
      const termByConstructorParams = this._terms.filter((term) => deepEqual(term.constructorParams, this._mockClassParams))

      const jestSpy = new JestSpyFunctionStrategy({ terms: termByConstructorParams })
      return jestSpy.mockImplementationFactory()(...mockParams)
    }
  }
}
