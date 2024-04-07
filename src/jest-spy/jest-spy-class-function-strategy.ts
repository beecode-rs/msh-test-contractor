import deepEqual from 'fast-deep-equal/es6'

import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy'
import { JestSpyStrategy } from '#src/jest-spy/jest-spy-strategy'
import { ContractTerm } from '#src/types'

export class JestSpyClassFunctionStrategy implements JestSpyStrategy {
	protected readonly _terms: ContractTerm[]
	protected readonly _mockClassParams: any[]
	protected readonly _name: string

	constructor(params: { terms: ContractTerm[]; mockClassParams: any[]; name: string }) {
		const { terms, mockClassParams, name } = params
		this._terms = terms
		this._mockClassParams = mockClassParams
		this._name = name
	}

	mockImplementationFactory(): (...args: any[]) => any {
		return (...mockParams: any[]): any => {
			const termByConstructorParams = this._terms.filter((term) => deepEqual(term.constructorParams, this._mockClassParams))

			const jestSpy = new JestSpyFunctionStrategy({ name: this._name, terms: termByConstructorParams })

			return jestSpy.mockImplementationFactory()(...mockParams)
		}
	}
}
