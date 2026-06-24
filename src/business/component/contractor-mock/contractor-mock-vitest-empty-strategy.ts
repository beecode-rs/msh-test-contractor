import { type MockStrategy } from '#src/business/component/contractor-mock/contractor-mock-strategy.js'

export class MockVitestEmptyStrategy implements MockStrategy {
	mock(): void {
		// dummy call
	}

	restore(): void {
		// dummy call
	}
}
