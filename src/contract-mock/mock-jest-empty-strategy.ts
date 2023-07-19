import { MockStrategy } from '#/contract-mock/mock-strategy.js'

export class MockJestEmptyStrategy implements MockStrategy {
	mock(): void {
		// dummy call
	}

	restore(): void {
		// dummy call
	}
}
