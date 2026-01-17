import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type VitestSpyClassFunctionStrategy } from '#src/vitest-spy/vitest-spy-class-function-strategy'
import * as VitestSpyClassFunctionStrategyModule from '#src/vitest-spy/vitest-spy-class-function-strategy'
import { type VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy'
import * as VitestSpyFunctionStrategyModule from '#src/vitest-spy/vitest-spy-function-strategy'
import { vitestSpyService } from '#src/vitest-spy/vitest-spy-service'

describe('vitestSpyService', () => {
	describe('strategyFromTerms', () => {
		let spy_VitestSpyFunctionStrategy: vi.SpiedClass<typeof VitestSpyFunctionStrategy>
		let spy_VitestSpyClassFunctionStrategy: vi.SpiedClass<typeof VitestSpyClassFunctionStrategy>
		beforeEach(() => {
			spy_VitestSpyFunctionStrategy = vi.spyOn(VitestSpyFunctionStrategyModule, 'VitestSpyFunctionStrategy')
			spy_VitestSpyClassFunctionStrategy = vi.spyOn(VitestSpyClassFunctionStrategyModule, 'VitestSpyClassFunctionStrategy')
		})

		it('should throw error if terms are empty array', () => {
			expect(() => {
				vitestSpyService.strategyFromTerms({ name: 'TEST', terms: [] })
			}).toThrow('Terms missing')
		})

		it('should return VitestSpyFunctionStrategy if there is no constructorParams in params', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			vitestSpyService.strategyFromTerms({ name: 'TEST', terms: [{} as any] })
			expect(spy_VitestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
			expect(spy_VitestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
		})

		it('should return VitestSpyClassFunctionStrategy if there is constructorParams in params', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			vitestSpyService.strategyFromTerms({ name: 'TEST', terms: [{ constructorParams: [] } as any] })
			expect(spy_VitestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
			expect(spy_VitestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
		})
	})
})
