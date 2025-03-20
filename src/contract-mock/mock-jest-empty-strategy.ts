import { type MockStrategy } from '#src/contract-mock/mock-strategy'

export class MockJestEmptyStrategy implements MockStrategy {
	mock(): void {
		// dummy call
	}

	restore(): void {
		// dummy call
	}
}
