import { describe, expect, it, vi } from 'vitest'

import { MockVitestStrategy } from '#src/business/component/contractor-mock/contractor-mock-vitest-strategy.js'

describe('MockVitestStrategy', () => {
	describe('mock', () => {
		it('should set restoreMockFn to empty array if vitestMock is not defined', () => {
			const strategy = new MockVitestStrategy()
			const params: any[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any
			strategy.mock({ params })
			expect(strategy['_restoreMockFn']).toEqual([])
		})

		it('should call vitest mock with params', () => {
			const dummyVitestMockResult = { test: 'test' }
			const dummyVitestMock = vi.fn<any>().mockReturnValue(dummyVitestMockResult) // eslint-disable-line @typescript-eslint/no-explicit-any
			const strategy = new MockVitestStrategy(dummyVitestMock)
			const params: any[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any
			strategy.mock({ params })
			expect(strategy['_restoreMockFn']).toEqual(dummyVitestMockResult)
			expect(dummyVitestMock).toHaveBeenCalledTimes(1)
		})
	})

	describe('restore', () => {
		it('should do nothing if restoreMockFn is not set', () => {
			const strategy = new MockVitestStrategy()
			expect(strategy['_restoreMockFn']).toBeUndefined()
			strategy.restore()
		})
		it('should do nothing if restoreMockFn is empty array', () => {
			const strategy = new MockVitestStrategy()
			strategy['_restoreMockFn'] = []
			strategy.restore()
		})
		it('should call multiple functions stored in restoreMockFn', () => {
			const strategy = new MockVitestStrategy()
			const mockFnArr = [vi.fn(), vi.fn(), vi.fn()]
			strategy['_restoreMockFn'] = mockFnArr
			strategy.restore()
			mockFnArr.forEach((fn) => {
				expect(fn).toHaveBeenCalledTimes(1)
			})
		})
	})
})
