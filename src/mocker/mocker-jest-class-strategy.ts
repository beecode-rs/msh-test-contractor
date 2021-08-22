import { SpecialFnName } from '../enum/special-fn-name'
import { jestSpyService } from '../jest-spy/jest-spy-service'
import { AnyContract, ContractFnTerm } from '../types'
import { fnUtil } from '../util/fn-util'
import { MockerStrategy } from './mocker-strategy'
import deepEqual from 'deep-equal'

export class MockerJestClassStrategy implements MockerStrategy<jest.SpyInstance> {
  protected _spy?: jest.SpyInstance

  constructor(protected _contract: AnyContract) {}

  public mockRestore(): void {
    if (this._spy) this._spy.mockRestore()
  }

  public contractSpy(): jest.SpyInstance {
    const { module, subjectName } = this._contract
    this._spy = jest.spyOn(module, subjectName)

    this._spy.mockImplementation(this._mockClass())

    return this._spy
  }

  protected _mockClass(): (...args: any[]) => any {
    const { fns } = this._contract

    return (...mockParams: any[]): any => {
      const objectWithMockedFunctions = Object.fromEntries(
        Object.entries(fns)
          .filter(([fnName]) => !fnUtil.isConstructor(fnName))
          .map(([fnName, ctFunc]) => {
            return [fnName, this._mockFunction({ fnName, terms: ctFunc!.terms, mockClassParams: mockParams })]
          })
      )

      // TODO should move above mockClass
      const foundTerm = fns[SpecialFnName.CONSTRUCTOR]!.terms.find((term) => deepEqual(term.params, mockParams))
      if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)
      // if (foundTerm instanceof Error) throw foundTerm.result

      foundTerm.result

      return { ...objectWithMockedFunctions, ...foundTerm.result }
    }
  }

  protected _mockFunction({
    fnName,
    terms,
    mockClassParams,
  }: {
    fnName: string
    terms: ContractFnTerm[]
    mockClassParams: any[]
  }): (...args: any[]) => any {
    const jestSpyStrategy = jestSpyService.strategyFromTerms({ terms, fnName, mockClassParams })
    return jestSpyStrategy.mockImplementation()
  }
}
