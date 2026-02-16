import { describe, it } from 'vitest'

import { MockVitestEmptyStrategy } from '#src/contract-mock/mock-vitest-empty-strategy.js'

describe('MockVitestEmptyStrategy', () => {
	describe('mock', () => {
		it('should do nothing', () => {
			const strategy = new MockVitestEmptyStrategy()
			strategy.mock()
		})
	})

	describe('restore', () => {
		it('should do nothing', () => {
			const strategy = new MockVitestEmptyStrategy()
			strategy.restore()
		})
	})
})
