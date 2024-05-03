import { vi } from 'vitest'

import { MockerStrategy } from '#src/mocker/mocker-strategy'
import { AnyContract } from '#src/types'

export class MockerJestFunctionStrategy implements MockerStrategy<vi.SpiedFunction<any>> {
	protected _spy?: vi.SpiedFunction<any>

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	contractSpy(): vi.SpiedFunction<any> {
		const { module, subjectName } = this._contract
		this._spy = vi.spyOn(module, subjectName)

		return this._spy
	}
}
