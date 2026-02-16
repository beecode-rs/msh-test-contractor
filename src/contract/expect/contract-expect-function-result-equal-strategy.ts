import { expect } from 'vitest'

import { type ContractExpectStrategy } from '#src/contract/expect/contract-expect-service.js'
import { type ContractTerm } from '#src/types/index.js'

export class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected readonly _termResult: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected readonly _termReturnFnParams: any

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
