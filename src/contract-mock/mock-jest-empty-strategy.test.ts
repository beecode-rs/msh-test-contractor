import { describe, it } from '@jest/globals'

import { MockJestEmptyStrategy } from '#src/contract-mock/mock-jest-empty-strategy'

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
