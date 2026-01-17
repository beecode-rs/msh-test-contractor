import { vi } from 'vitest'

import { SpecialFnName } from '#src/enum/special-fn-name'
import { VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy'
import { vitestSpyService } from '#src/vitest-spy/vitest-spy-service'
import { type MockerStrategy } from '#src/mocker/mocker-strategy'
import { type AnyContract, type ContractTerm } from '#src/types/index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MockerVitestClassStrategy implements MockerStrategy<vi.Spied<any>> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _spy?: vi.Spied<any>

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	contractSpy(): vi.Spied<any> {
		const { module, subjectName } = this._contract
		const functionNames = this._functionNames(module[subjectName])
		this._spy = vi.spyOn(module, subjectName)
		this._spy.mockImplementation(this._mockClass(functionNames))

		return this._spy
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _functionNames(classObject: any): string[] {
		return Object.getOwnPropertyNames(classObject.prototype).filter((fn) => fn !== 'constructor')
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _mockClass(functionNames: string[]): (...args: any[]) => any {
		const { fns, subjectName } = this._contract

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (...mockParams: any[]): any => {
			const { [SpecialFnName.CONSTRUCTOR]: constructorFns, ...restFns } = fns

			const objectWithMockedFunctions = Object.fromEntries(
				functionNames.map((fnName) => {
					const mockFn = vi.fn()
					if (restFns[fnName]?.terms) {
						const mockImpl = this._mockFunction({
							mockClassParams: mockParams,
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							name: `${subjectName}.${fnName}`,
							terms: restFns[fnName].terms,
						})
						mockFn.mockImplementation(mockImpl)
					}

					return [fnName, mockFn]
				})
			)

			const constructorVitestSpy = new VitestSpyFunctionStrategy({ name: subjectName, terms: constructorFns!.terms })
			const constructorMockImplementation = constructorVitestSpy.mockImplementationFactory()

			const constructorResultObject = constructorMockImplementation(...mockParams)

			return { ...objectWithMockedFunctions, ...constructorResultObject }
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _mockFunction(params: { terms: ContractTerm[]; mockClassParams: any[]; name: string }): (...args: any[]) => any {
		const { terms, mockClassParams, name } = params
		const vitestSpyStrategy = vitestSpyService.strategyFromTerms({ mockClassParams, name, terms })

		return vitestSpyStrategy.mockImplementationFactory()
	}
}
