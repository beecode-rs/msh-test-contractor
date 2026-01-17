import { vi } from 'vitest'

import { VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy'
import { type MockerStrategy } from '#src/mocker/mocker-strategy'
import { type AnyContract } from '#src/types/index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MockerVitestObjectResult = Record<string, vi.Spied<any>>

export class MockerVitestObjectStrategy implements MockerStrategy<MockerVitestObjectResult> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _spies: vi.Spied<any>[] = []

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		this._spies.forEach((spy) => spy.mockRestore())
	}

	contractSpy(): MockerVitestObjectResult {
		return this._mockObject()
	}

	protected _mockObject(): MockerVitestObjectResult {
		const { module, subjectName } = this._contract

		return Object.fromEntries(
			Object.entries(this._contract.fns).map(([fnName, ctFunc]) => {
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				const vitestSpyFunction = new VitestSpyFunctionStrategy({ name: `${subjectName}.${fnName}`, terms: ctFunc!.terms })
				const spy = vi.spyOn(module[subjectName], fnName).mockImplementation(vitestSpyFunction.mockImplementationFactory())
				this._spies.push(spy)

				return [fnName, spy]
			})
		)
	}
}
