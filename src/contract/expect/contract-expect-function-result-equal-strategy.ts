import { expect } from '@jest/globals'

import { ContractExpectStrategy } from '#src/contract/expect/contract-expect-service'
import { ContractTerm } from '#src/types'

export class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
	protected readonly _termResult: any
	protected readonly _termReturnFnParams: any

	constructor(params: { term: ContractTerm }) {
		const { term } = params
		this._termResult = term.result
		this._termReturnFnParams = term.returnFnParams
	}

	async test(fn: () => any): Promise<void> {
		const result = fn()(...this._termReturnFnParams)
		expect(await result).toEqual(this._termResult)
	}
}
