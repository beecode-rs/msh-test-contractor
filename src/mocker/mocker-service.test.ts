// Supplements: ./mocker-service.contract.yaml
// Covers: function and class subject branches — require real Function/Class objects that can't be expressed in YAML

import { describe, expect, it } from 'vitest'

import { mockerService } from '#src/mocker/mocker-service.js'
import { MockerVitestClassStrategy } from '#src/mocker/mocker-vitest-class-strategy.js'
import { MockerVitestFunctionStrategy } from '#src/mocker/mocker-vitest-function-strategy.js'
import { type AnyContract } from '#src/types/index.js'

describe('mockerService', () => {
	describe('strategyFromContract', () => {
		it('should return MockerVitestFunctionStrategy for function subject with SELF in fns', () => {
			const myFunc = (): string => {
				return 'test'
			}
			const contract = {
				fns: { SELF: { terms: [] } },
				module: { myFunc },
				subjectName: 'myFunc',
			} as AnyContract
			const result = mockerService.strategyFromContract(contract)
			expect(result).toBeInstanceOf(MockerVitestFunctionStrategy)
		})

		it('should return MockerVitestClassStrategy for class subject', () => {
			// eslint-disable-next-line @typescript-eslint/no-extraneous-class
			class MyClass {}
			const contract = {
				fns: {},
				module: { MyClass },
				subjectName: 'MyClass',
			} as AnyContract
			const result = mockerService.strategyFromContract(contract)
			expect(result).toBeInstanceOf(MockerVitestClassStrategy)
		})

		it('should return MockerVitestClassStrategy for function subject without SELF in fns', () => {
			const myFunc = (): string => {
				return 'test'
			}
			const contract = {
				fns: {},
				module: { myFunc },
				subjectName: 'myFunc',
			} as AnyContract
			const result = mockerService.strategyFromContract(contract)
			expect(result).toBeInstanceOf(MockerVitestClassStrategy)
		})
	})
})
