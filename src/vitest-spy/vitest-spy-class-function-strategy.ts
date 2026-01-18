import deepEqual from 'fast-deep-equal'

import { type ContractTerm } from '#src/types/index'
import { VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy'
import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy'

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (...mockParams: any[]): any => {
			const termByConstructorParams = this._terms.filter((term) => deepEqual(term.constructorParams, this._mockClassParams))

			const vitestSpy = new VitestSpyFunctionStrategy({ name: this._name, terms: termByConstructorParams })

			return vitestSpy.mockImplementationFactory()(...mockParams)
		}
	}
}
