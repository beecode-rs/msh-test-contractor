import { beforeEach, describe, expect, it, vi } from 'vitest'

import { vitestSpyService } from '#src/vitest-spy/vitest-spy-service.js'

// Mock the strategy classes
vi.mock('#src/vitest-spy/vitest-spy-function-strategy.js', () => ({
	VitestSpyFunctionStrategy: vi.fn(),
}))

vi.mock('#src/vitest-spy/vitest-spy-class-function-strategy.js', () => ({
	VitestSpyClassFunctionStrategy: vi.fn(),
}))

// Import after mocking to get the mocked versions
const { VitestSpyFunctionStrategy } = await import('#src/vitest-spy/vitest-spy-function-strategy.js')
const { VitestSpyClassFunctionStrategy } = await import('#src/vitest-spy/vitest-spy-class-function-strategy.js')

describe('vitestSpyService', () => {
	describe('strategyFromTerms', () => {
		beforeEach(() => {
			vi.clearAllMocks()
		})

		it('should throw error if terms are empty array', () => {
			expect(() => {
				vitestSpyService.strategyFromTerms({ name: 'TEST', terms: [] })
			}).toThrow('Terms missing')
		})

		it('should return VitestSpyFunctionStrategy if there is no constructorParams in params', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			vitestSpyService.strategyFromTerms({ name: 'TEST', terms: [{} as any] })
			expect(VitestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
			expect(VitestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
		})

		it('should return VitestSpyClassFunctionStrategy if there is constructorParams in params', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			vitestSpyService.strategyFromTerms({ mockClassParams: [], name: 'TEST', terms: [{ constructorParams: [] } as any] })
			expect(VitestSpyFunctionStrategy).toHaveBeenCalledTimes(0)
			expect(VitestSpyClassFunctionStrategy).toHaveBeenCalledTimes(1)
		})
	})
})
