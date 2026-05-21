// Supplements: ./mocker-vitest-object-strategy.contract.yaml
// Covers: mockRestore() and contractSpy() — require runtime vi.spyOn and MockInstance objects that can't be expressed in YAML

import { describe, expect, it, vi } from 'vitest'

import { MockerVitestObjectStrategy } from '#src/mocker/mocker-vitest-object-strategy.js'
import { type AnyContract } from '#src/types/index.js'

describe('MockerVitestObjectStrategy', () => {
	describe('mockRestore', () => {
		it('should not throw when spies array is empty', () => {
			const contract = { module: {}, subjectName: 'test' } as AnyContract
			const strategy = new MockerVitestObjectStrategy(contract)

			expect(() => {
				strategy.mockRestore()
			}).not.toThrow()
		})

		it('should restore all spied functions after contractSpy', () => {
			const mockSubject = {
				methodA: () => {
					return 'original-a'
				},
				methodB: () => {
					return 'original-b'
				},
			}
			const mockModule = { myObject: mockSubject }
			const contract = {
				fns: {
					methodA: { terms: [{ params: [], result: 'mocked-a' }] },
					methodB: { terms: [{ params: [], result: 'mocked-b' }] },
				},
				module: mockModule,
				subjectName: 'myObject',
			} as AnyContract
			const strategy = new MockerVitestObjectStrategy(contract)

			strategy.contractSpy()

			expect(mockSubject.methodA()).toBe('mocked-a')
			expect(mockSubject.methodB()).toBe('mocked-b')

			strategy.mockRestore()

			expect(mockSubject.methodA()).toBe('original-a')
			expect(mockSubject.methodB()).toBe('original-b')
		})
	})

	describe('contractSpy', () => {
		it('should return empty object when fns is empty', () => {
			const mockModule = { myObject: {} }
			const contract = {
				fns: {},
				module: mockModule,
				subjectName: 'myObject',
			} as AnyContract
			const strategy = new MockerVitestObjectStrategy(contract)

			const result = strategy.contractSpy()

			expect(result).toEqual({})
		})

		it('should create spies for all functions in fns', () => {
			const mockSubject = {
				methodA: () => {
					return 'original-a'
				},
				methodB: () => {
					return 'original-b'
				},
			}
			const mockModule = { myObject: mockSubject }
			const contract = {
				fns: {
					methodA: { terms: [{ params: [], result: 'mocked-a' }] },
					methodB: { terms: [{ params: [], result: 'mocked-b' }] },
				},
				module: mockModule,
				subjectName: 'myObject',
			} as AnyContract
			const strategy = new MockerVitestObjectStrategy(contract)

			const result = strategy.contractSpy()

			expect(Object.keys(result)).toEqual(['methodA', 'methodB'])
			expect(vi.isMockFunction(result.methodA)).toBe(true)
			expect(vi.isMockFunction(result.methodB)).toBe(true)
		})
	})
})
