import { jest } from '@jest/globals'

import { MockerStrategy } from '#/mocker/mocker-strategy'
import { AnyContract } from '#/types'

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
