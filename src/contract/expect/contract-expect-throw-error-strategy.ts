import { expect } from 'vitest'

import { ContractExpectStrategy } from '#src/contract/expect/contract-expect-service'
import { ContractTerm } from '#src/types'

export class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
	protected readonly _termResult: any

	constructor(params: { term: ContractTerm }) {
		const { term } = params
		this._termResult = term.result
	}

	async test(fn: () => any): Promise<void> {
		expect(() => fn()).toThrow(this._termResult.message)
	}
}
