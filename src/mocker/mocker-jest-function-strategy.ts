import { MockerStrategy } from 'src/mocker/mocker-strategy'
import { AnyContract } from 'src/types'

export class MockerJestFunctionStrategy implements MockerStrategy<jest.SpyInstance> {
	protected _spy?: jest.SpyInstance

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		if (this._spy) {
			this._spy.mockRestore()
		}
	}

	contractSpy(): jest.SpyInstance {
		const { module, subjectName } = this._contract
		this._spy = jest.spyOn(module, subjectName)

		return this._spy
	}
}
