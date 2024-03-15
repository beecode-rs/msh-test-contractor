import { MockStrategy } from '#src/contract-mock/mock-strategy'
import { ContractMock, ContractMockRevertFns } from '#src/types'

export class MockJestStrategy implements MockStrategy {
	protected _restoreMockFn?: ContractMockRevertFns

	constructor(protected readonly _mock?: ContractMock) {}

	mock(mockParams: { params?: any[] } = {}): void {
		const { params } = mockParams
		this._restoreMockFn = this._mock ? this._mock({ params }) : []
	}

	restore(): void {
		if (this._restoreMockFn) {
			this._restoreMockFn.forEach((rf) => rf())
		}
	}
}
