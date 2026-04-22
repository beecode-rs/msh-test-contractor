import { type Mock, vi } from 'vitest'

import { type ContractTerm } from '#src/types/index.js'
import { objectUtil } from '#src/util/object-util.js'
import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy.js'

export class VitestSpyFunctionStrategy implements VitestSpyStrategy {
	protected readonly _terms: ContractTerm[]
	protected readonly _name: string

	constructor(params: { terms: ContractTerm[]; name: string }) {
		const { terms, name } = params
		this._terms = terms
		this._name = name
	}

	mockImplementationFactory(): Mock {
		const terms = this._terms
		const name = this._name

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fakeImplementation = function (...mockParams: any[]): any {
			const foundTerm = terms.find(
				(term) => objectUtil.stringifyOrNullUndefined(term.params) === objectUtil.stringifyOrNullUndefined(mockParams)
			)
			if (!foundTerm) {
				throw new Error(`Unknown contract ${name} for params ${JSON.stringify(mockParams)}`)
			}

			return foundTerm.result
		}

		return vi.fn().mockImplementation(fakeImplementation)
	}
}
