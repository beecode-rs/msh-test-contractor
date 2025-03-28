import { describe, expect, it, vi } from 'vitest'

import { MockJestStrategy } from '#src/contract-mock/mock-jest-strategy'

describe('MockJestStrategy', () => {
	describe('mock', () => {
		it('should set restoreMockFn to empty array if jestMock is not defined', () => {
			const strategy = new MockJestStrategy()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const params: any[] = []
			strategy.mock({ params })
			expect(strategy['_restoreMockFn']).toEqual([])
		})

		it('should call jest mock with params', () => {
			const dummyJestMockResult = { test: 'test' }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const dummyJestMock = vi.fn<any>().mockReturnValue(dummyJestMockResult)
			const strategy = new MockJestStrategy(dummyJestMock)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const params: any[] = []
			strategy.mock({ params })
			expect(strategy['_restoreMockFn']).toEqual(dummyJestMockResult)
			expect(dummyJestMock).toHaveBeenCalledTimes(1)
		})
	})

	describe('restore', () => {
		it('should do nothing if restoreMockFn is not set', () => {
			const strategy = new MockJestStrategy()
			expect(strategy['_restoreMockFn']).toBeUndefined()
			strategy.restore()
		})
		it('should do nothing if restoreMockFn is empty array', () => {
			const strategy = new MockJestStrategy()
			strategy['_restoreMockFn'] = []
			strategy.restore()
		})
		it('should call multiple functions stored in restoreMockFn', () => {
			const strategy = new MockJestStrategy()
			const mockFnArr = [vi.fn(), vi.fn(), vi.fn()]
			strategy['_restoreMockFn'] = mockFnArr
			strategy.restore()
			mockFnArr.forEach((fn) => {
				expect(fn).toHaveBeenCalledTimes(1)
			})
		})
	})
})
