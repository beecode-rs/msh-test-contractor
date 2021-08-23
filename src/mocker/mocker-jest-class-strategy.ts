import { SpecialFnName } from '../enum/special-fn-name'
import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { jestSpyService } from '../jest-spy/jest-spy-service'
import { AnyContract, ContractFnTerm } from '../types'
import { MockerStrategy } from './mocker-strategy'

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
      const { _constructor: constructorFns, ...restFns } = fns

      const objectWithMockedFunctions = Object.fromEntries(
        Object.entries(restFns).map(([fnName, ctFunc]) => [
          fnName,
          this._mockFunction({ terms: ctFunc!.terms, mockClassParams: mockParams }),
        ])
      )

      const jestSpy = new JestSpyFunctionStrategy({ terms: fns[SpecialFnName.CONSTRUCTOR]!.terms })
      const result = jestSpy.mockImplementationFactory()(...mockParams)
      return { ...objectWithMockedFunctions, ...result }
    }
  }

  protected _mockFunction({
    terms,
    mockClassParams,
  }: {
    terms: ContractFnTerm[]
    mockClassParams: any[]
  }): (...args: any[]) => any {
    const jestSpyStrategy = jestSpyService.strategyFromTerms({ terms, mockClassParams })
    return jestSpyStrategy.mockImplementationFactory()
  }
}
