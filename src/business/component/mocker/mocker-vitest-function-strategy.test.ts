// Supplements: ./mocker-vitest-function-strategy.contract.yaml
// Covers: mockRestore() and contractSpy() — require runtime vi.spyOn and MockInstance objects that can't be expressed in YAML

import { describe, expect, it, vi } from 'vitest'

import { MockerVitestFunctionStrategy } from '#src/business/component/mocker/mocker-vitest-function-strategy.js'
import { type AnyContract } from '#src/business/model/contract-model.js'

describe('MockerVitestFunctionStrategy', () => {
	describe('mockRestore', () => {
		it('should not throw when spy is not set', () => {
			const contract = { module: {}, subjectName: 'test' } as AnyContract
			const strategy = new MockerVitestFunctionStrategy(contract)

			expect(() => {
				strategy.mockRestore()
			}).not.toThrow()
		})

		it('should restore the original function after contractSpy', () => {
			const mockModule = {
				myFunc: () => {
					return 'original'
				},
			}
			const contract = { module: mockModule, subjectName: 'myFunc' } as AnyContract
			const strategy = new MockerVitestFunctionStrategy(contract)

			const spy = strategy.contractSpy()
			spy.mockReturnValue('mocked')
			expect(mockModule.myFunc()).toBe('mocked')

			strategy.mockRestore()
			expect(mockModule.myFunc()).toBe('original')
		})
	})

	describe('contractSpy', () => {
		it('should create and return a spy using vi.spyOn', () => {
			const mockModule = {
				myFunc: () => {
					return 'original'
				},
			}
			const contract = { module: mockModule, subjectName: 'myFunc' } as AnyContract
			const strategy = new MockerVitestFunctionStrategy(contract)

			const spy = strategy.contractSpy()

			expect(spy).toBeDefined()
			expect(vi.isMockFunction(spy)).toBe(true)
		})
	})
})
