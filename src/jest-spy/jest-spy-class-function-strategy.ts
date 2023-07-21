import deepEqual from 'fast-deep-equal/es6/index.js'

import { JestSpyFunctionStrategy } from '#/jest-spy/jest-spy-function-strategy.js'
import { JestSpyStrategy } from '#/jest-spy/jest-spy-strategy.js'
import { ContractTerm } from '#/types/index.js'

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
