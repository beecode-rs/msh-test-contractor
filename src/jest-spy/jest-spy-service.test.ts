import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { type JestSpyClassFunctionStrategy } from '#src/jest-spy/jest-spy-class-function-strategy'
import * as JestSpyClassFunctionStrategyModule from '#src/jest-spy/jest-spy-class-function-strategy'
import { type JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy'
import * as JestSpyFunctionStrategyModule from '#src/jest-spy/jest-spy-function-strategy'
import { jestSpyService } from '#src/jest-spy/jest-spy-service'

describe('jestSpyService', () => {
	describe('strategyFromTerms', () => {
		let spy_JestSpyFunctionStrategy: vi.SpiedClass<typeof JestSpyFunctionStrategy>
		let spy_JestSpyClassFunctionStrategy: vi.SpiedClass<typeof JestSpyClassFunctionStrategy>
		beforeEach(() => {
			spy_JestSpyFunctionStrategy = vi.spyOn(JestSpyFunctionStrategyModule, 'JestSpyFunctionStrategy')
			spy_JestSpyClassFunctionStrategy = vi.spyOn(JestSpyClassFunctionStrategyModule, 'JestSpyClassFunctionStrategy')
		})

		it('should throw error if terms are empty array', () => {
			expect(() => {
				jestSpyService.strategyFromTerms({ name: 'TEST', terms: [] })
			}).toThrow('Terms missing')
		})

		it('should return JestSpyFunctionStrategy if there is no constructorParams in params', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			jestSpyService.strategyFromTerms({ name: 'TEST', terms: [{} as any] })
			expect(spy_JestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
			expect(spy_JestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
		})

		it('should return JestSpyClassFunctionStrategy if there is constructorParams in params', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			jestSpyService.strategyFromTerms({ name: 'TEST', terms: [{ constructorParams: [] } as any] })
			expect(spy_JestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
			expect(spy_JestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
		})
	})
})
