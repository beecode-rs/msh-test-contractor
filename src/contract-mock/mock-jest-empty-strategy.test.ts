import { MockJestEmptyStrategy } from '#/contract-mock/mock-jest-empty-strategy.js'

describe('MockJestEmptyStrategy', () => {
	describe('mock', () => {
		it('should do nothing', () => {
			const strategy = new MockJestEmptyStrategy()
			strategy.mock()
		})
	})

	describe('restore', () => {
		it('should do nothing', () => {
			const strategy = new MockJestEmptyStrategy()
			strategy.restore()
		})
	})
})
