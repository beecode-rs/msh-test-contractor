import { JestSpyFunctionStrategy } from 'src/jest-spy/jest-spy-function-strategy'
import { MockerStrategy } from 'src/mocker/mocker-strategy'
import { AnyContract } from 'src/types'

export type MockerJestObjectResult = { [k: string]: jest.SpyInstance }

export class MockerJestObjectStrategy implements MockerStrategy<MockerJestObjectResult> {
	protected _spies: jest.SpyInstance[] = []

	constructor(protected _contract: AnyContract) {}

	mockRestore(): void {
		this._spies.forEach((spy) => spy.mockRestore())
	}

	contractSpy(): MockerJestObjectResult {
		return this._mockObject()
	}

	protected _mockObject(): MockerJestObjectResult {
		const { module, subjectName } = this._contract

		return Object.fromEntries(
			Object.entries(this._contract.fns).map(([fnName, ctFunc]) => {
				const jestSpyFunction = new JestSpyFunctionStrategy({ name: `${subjectName}.${fnName}`, terms: ctFunc!.terms })
				const spy = jest.spyOn(module[subjectName], fnName).mockImplementation(jestSpyFunction.mockImplementationFactory())
				this._spies.push(spy)

				return [fnName, spy]
			})
		)
	}
}
