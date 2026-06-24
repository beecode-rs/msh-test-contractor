import { expect } from 'vitest'

import { type ContractExpectStrategy } from '#src/business/component/contractor-expect/contract-expect-service.js'
import { type ContractTerm } from '#src/business/model/contract-model.js'

export class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
	protected readonly _termResult: any // eslint-disable-line @typescript-eslint/no-explicit-any
	protected readonly _termReturnFnParams: any // eslint-disable-line @typescript-eslint/no-explicit-any

	constructor(params: { term: ContractTerm }) {
		const { term } = params
		this._termResult = term.result
		this._termReturnFnParams = term.returnFnParams
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async test(fn: () => any): Promise<void> {
		const result = fn()(...this._termReturnFnParams)
		expect(await result).toEqual(this._termResult)
	}
}
