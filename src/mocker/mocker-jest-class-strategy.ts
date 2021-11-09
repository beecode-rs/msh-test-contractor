import { SpecialFnName } from '../enum/special-fn-name'
import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { jestSpyService } from '../jest-spy/jest-spy-service'
import { AnyContract, ContractTerm } from '../types'
import { MockerStrategy } from './mocker-strategy'

export class MockerJestClassStrategy implements MockerStrategy<jest.SpyInstance> {
  protected _spy?: jest.SpyInstance

  constructor(protected _contract: AnyContract) {}

  public mockRestore(): void {
    if (this._spy) this._spy.mockRestore()
  }

  public contractSpy(): jest.SpyInstance {
    const { module, subjectName } = this._contract
    const functionNames = this._functionNames(module[subjectName])
    this._spy = jest.spyOn(module, subjectName)
    this._spy.mockImplementation(this._mockClass(functionNames))
    return this._spy
  }

  protected _functionNames(classObject: any): string[] {
    return Object.getOwnPropertyNames(classObject.prototype).filter((fn) => fn !== 'constructor')
  }

  protected _mockClass(functionNames: string[]): (...args: any[]) => any {
    const { fns, subjectName } = this._contract

    return (...mockParams: any[]): any => {
      const { [SpecialFnName.CONSTRUCTOR]: constructorFns, ...restFns } = fns

      const objectWithMockedFunctions = Object.fromEntries(
        functionNames.map((fnName) => {
          const mockFn = jest.fn()
          if (restFns[fnName]?.terms) {
            const mockImpl = this._mockFunction({
              terms: restFns[fnName]!.terms,
              mockClassParams: mockParams,
              name: `${subjectName}.${fnName}`,
            })
            mockFn.mockImplementation(mockImpl)
          }
          return [fnName, mockFn]
        })
      )

      const constructorJestSpy = new JestSpyFunctionStrategy({ terms: constructorFns!.terms, name: subjectName })
      const constructorMockImplementation = constructorJestSpy.mockImplementationFactory()

      const constructorResultObject = constructorMockImplementation(...mockParams)
      return { ...objectWithMockedFunctions, ...constructorResultObject }
    }
  }

  protected _mockFunction(params: { terms: ContractTerm[]; mockClassParams: any[]; name: string }): (...args: any[]) => any {
    const { terms, mockClassParams, name } = params
    const jestSpyStrategy = jestSpyService.strategyFromTerms({ terms, mockClassParams, name })
    return jestSpyStrategy.mockImplementationFactory()
  }
}
