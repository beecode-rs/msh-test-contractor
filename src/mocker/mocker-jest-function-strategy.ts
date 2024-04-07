import { jest } from '@jest/globals'

import { MockerStrategy } from '#src/mocker/mocker-strategy'
import { AnyContract } from '#src/types'

export class MockerJestFunctionStrategy implements MockerStrategy<jest.SpiedFunction<any>> {
	protected _spy?: jest.SpiedFunction<any>

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	contractSpy(): jest.SpiedFunction<any> {
		const { module, subjectName } = this._contract
		this._spy = jest.spyOn(module, subjectName)

		return this._spy
	}
}
