import { vi } from 'vitest'

import { type MockerStrategy } from '#src/mocker/mocker-strategy'
import { type AnyContract } from '#src/types/index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MockerJestFunctionStrategy implements MockerStrategy<vi.SpiedFunction<any>> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected _spy?: vi.SpiedFunction<any>

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	contractSpy(): vi.SpiedFunction<any> {
		const { module, subjectName } = this._contract
		this._spy = vi.spyOn(module, subjectName)

		return this._spy
	}
}
