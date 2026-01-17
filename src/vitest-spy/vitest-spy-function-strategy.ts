import { type Mock, vi } from 'vitest'

import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy'
import { type ContractTerm } from '#src/types/index'
import { objectUtil } from '#src/util/object-util'

export class VitestSpyFunctionStrategy implements VitestSpyStrategy {
	protected readonly _terms: ContractTerm[]
	protected readonly _name: string

	constructor(params: { terms: ContractTerm[]; name: string }) {
		const { terms, name } = params
		this._terms = terms
		this._name = name
	}

	mockImplementationFactory(): Mock {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fakeImplementation = (...mockParams: any[]): any => {
			const foundTerm = this._terms.find(
				(term) => objectUtil.stringifyOrNullUndefined(term.params) === objectUtil.stringifyOrNullUndefined(mockParams)
			)
			if (!foundTerm) {
				throw new Error(`Unknown contract ${this._name} for params ${JSON.stringify(mockParams)}`)
			}

			return foundTerm.result
		}

		return vi.fn().mockImplementation(fakeImplementation)
	}
}
