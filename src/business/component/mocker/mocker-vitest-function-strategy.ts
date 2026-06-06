import { type MockInstance, vi } from 'vitest'

import { type MockerStrategy } from '#src/business/component/mocker/mocker-strategy.js'
import { type AnyContract } from '#src/business/model/contract-model.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MockerVitestFunctionStrategy implements MockerStrategy<MockInstance<any>> {
	protected _spy?: MockInstance<any> // eslint-disable-line @typescript-eslint/no-explicit-any

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	contractSpy(): MockInstance<any> {
		const { module, subjectName } = this._contract
		this._spy = vi.spyOn(module, subjectName)

		return this._spy
	}
}
