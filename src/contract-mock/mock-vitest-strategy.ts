import { type MockStrategy } from '#src/contract-mock/mock-strategy.js'
import { type ContractMock, type ContractMockRevertFns } from '#src/types/index.js'

export class MockVitestStrategy implements MockStrategy {
	protected _restoreMockFn?: ContractMockRevertFns

	constructor(protected readonly _mock?: ContractMock) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mock(mockParams: { params?: any[] } = {}): void {
		const { params } = mockParams
		this._restoreMockFn = []
		if (this._mock) {
			this._restoreMockFn = this._mock({ params })
		}
	}

	restore(): void {
		if (this._restoreMockFn) {
			this._restoreMockFn.forEach((rf) => {
				rf()
			})
		}
	}
}
