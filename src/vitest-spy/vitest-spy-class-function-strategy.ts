import deepEqual from 'fast-deep-equal'

import { type ContractTerm } from '#src/types/index.js'
import { VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy.js'
import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy.js'

export class VitestSpyClassFunctionStrategy implements VitestSpyStrategy {
	protected readonly _terms: ContractTerm[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected readonly _mockClassParams: any[]
	protected readonly _name: string

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(params: { terms: ContractTerm[]; mockClassParams: any[]; name: string }) {
		const { terms, mockClassParams, name } = params
		this._terms = terms
		this._mockClassParams = mockClassParams
		this._name = name
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mockImplementationFactory(): (...args: any[]) => any {
		const terms = this._terms
		const mockClassParams = this._mockClassParams
		const name = this._name

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return function (...mockParams: any[]): any {
			const termByConstructorParams = terms.filter((term) => deepEqual(term.constructorParams, mockClassParams))

			const vitestSpy = new VitestSpyFunctionStrategy({ name, terms: termByConstructorParams })

			return vitestSpy.mockImplementationFactory()(...mockParams)
		}
	}
}
