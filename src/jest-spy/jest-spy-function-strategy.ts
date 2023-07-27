import { JestSpyStrategy } from 'src/jest-spy/jest-spy-strategy'
import { ContractTerm } from 'src/types'
import { objectUtil } from 'src/util/object-util'

export class JestSpyFunctionStrategy implements JestSpyStrategy {
	protected readonly _terms: ContractTerm[]
	protected readonly _name: string

	constructor(params: { terms: ContractTerm[]; name: string }) {
		const { terms, name } = params
		this._terms = terms
		this._name = name
	}

	mockImplementationFactory(): jest.Mock {
		const fakeImplementation = (...mockParams: any[]): any => {
			const foundTerm = this._terms.find(
				(term) => objectUtil.stringifyOrNullUndefined(term.params) === objectUtil.stringifyOrNullUndefined(mockParams)
			)
			if (!foundTerm) {
				throw new Error(`Unknown contract ${this._name} for params ${JSON.stringify(mockParams)}`)
			}

			return foundTerm.result
		}

		return jest.fn().mockImplementation(fakeImplementation)
	}
}
