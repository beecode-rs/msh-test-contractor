import { type Mock, vi } from 'vitest'

import { type ContractTerm } from '#src/business/model/contract-model.js'
import { objectUtil } from '#src/util/object-util.js'
import { type VitestSpyStrategy } from '#src/business/component/vitest-spy/vitest-spy-strategy.js'

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
				const paramsYaml = JSON.stringify(mockParams)
				throw new Error(
					`Missing mock term for '${name}' called with params: ${paramsYaml}\n\nAdd this term to the contract YAML:\n\n      - params: ${paramsYaml}\n        result: <expected_value>`
				)
			}

			return foundTerm.result
		}

		return vi.fn().mockImplementation(fakeImplementation)
	}
}
