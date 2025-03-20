import { expect } from 'vitest'

import { type ContractExpectStrategy } from '#src/contract/expect/contract-expect-service'
import { type ContractTerm } from '#src/types/index'

export class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected readonly _termResult: any

	constructor(params: { term: ContractTerm }) {
		const { term } = params
		this._termResult = term.result
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	async test(fn: () => any): Promise<void> {
		expect(() => fn()).toThrow(this._termResult.message)
	}
}
