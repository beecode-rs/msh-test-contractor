import { vi } from 'vitest'

import { SpecialFnName } from '#src/enum/special-fn-name'
import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy'
import { jestSpyService } from '#src/jest-spy/jest-spy-service'
import { MockerStrategy } from '#src/mocker/mocker-strategy'
import { AnyContract, ContractTerm } from '#src/types'

export class MockerJestClassStrategy implements MockerStrategy<vi.Spied<any>> {
	protected _spy?: vi.Spied<any>

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	contractSpy(): vi.Spied<any> {
		const { module, subjectName } = this._contract
		const functionNames = this._functionNames(module[subjectName])
		this._spy = vi.spyOn(module, subjectName)
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
					const mockFn = vi.fn()
					if (restFns[fnName]?.terms) {
						const mockImpl = this._mockFunction({
							mockClassParams: mockParams,
							name: `${subjectName}.${fnName}`,
							terms: restFns[fnName]!.terms,
						})
						mockFn.mockImplementation(mockImpl)
					}

					return [fnName, mockFn]
				})
			)

			const constructorJestSpy = new JestSpyFunctionStrategy({ name: subjectName, terms: constructorFns!.terms })
			const constructorMockImplementation = constructorJestSpy.mockImplementationFactory()

			const constructorResultObject = constructorMockImplementation(...mockParams)

			return { ...objectWithMockedFunctions, ...constructorResultObject }
		}
	}

	protected _mockFunction(params: { terms: ContractTerm[]; mockClassParams: any[]; name: string }): (...args: any[]) => any {
		const { terms, mockClassParams, name } = params
		const jestSpyStrategy = jestSpyService.strategyFromTerms({ mockClassParams, name, terms })

		return jestSpyStrategy.mockImplementationFactory()
	}
}
