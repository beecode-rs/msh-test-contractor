import { describe, expect, it } from 'vitest'

import { ContractExpectThrowErrorStrategy } from '#src/contract/expect/contract-expect-throw-error-strategy.js'

describe('ContractExpectThrowErrorStrategy', () => {
	describe('test', () => {
		it('fails when function does not throw', async () => {
			const strategy = new ContractExpectThrowErrorStrategy({
				term: { params: [], result: new Error('test error') },
			})

			await expect(
				strategy.test(() => {
					return 'no throw'
				})
			).rejects.toThrow()
		})

		it('fails when function throws with different message', async () => {
			const strategy = new ContractExpectThrowErrorStrategy({
				term: { params: [], result: new Error('expected error') },
			})

			await expect(
				strategy.test(() => {
					throw new Error('different error')
				})
			).rejects.toThrow()
		})
	})
})
