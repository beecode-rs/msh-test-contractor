import { type MockInstance, vi } from 'vitest'

import { type MockerStrategy } from '#src/business/component/mocker/mocker-strategy.js'
import { VitestSpyFunctionStrategy } from '#src/business/component/vitest-spy/vitest-spy-function-strategy.js'
import { type AnyContract } from '#src/business/model/contract-model.js'

export type MockerVitestObjectResult = Record<string, MockInstance<any>> // eslint-disable-line @typescript-eslint/no-explicit-any

export class MockerVitestObjectStrategy implements MockerStrategy<MockerVitestObjectResult> {
	protected _spies: MockInstance<any>[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		this._spies.forEach((spy) => {
			spy.mockRestore()
		})
	}

	contractSpy(): MockerVitestObjectResult {
		return this._mockObject()
	}

	protected _mockObject(): MockerVitestObjectResult {
		const { module, subjectName } = this._contract

		return Object.fromEntries(
			Object.entries(this._contract.fns).map(([fnName, ctFunc]) => {
				const vitestSpyFunction = new VitestSpyFunctionStrategy({
					name: `${subjectName}.${fnName}`, // eslint-disable-line @typescript-eslint/restrict-template-expressions
					terms: ctFunc!.terms,
				})
				const spy = vi
					.spyOn(module[subjectName], fnName)
					.mockImplementation(vitestSpyFunction.mockImplementationFactory())
				this._spies.push(spy)

				return [fnName, spy]
			})
		)
	}
}
