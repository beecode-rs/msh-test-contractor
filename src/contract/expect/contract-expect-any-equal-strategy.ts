import { expect } from 'vitest'

import { type ContractExpectStrategy } from '#src/contract/expect/contract-expect-service'
import { type ContractTerm } from '#src/types/index'
import { objectUtil } from '#src/util/object-util'

export class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected readonly _termResult: any

	constructor(params: { term: ContractTerm }) {
		const { term } = params
		this._termResult = term.result
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async test(fn: () => any): Promise<void> {
		const result = await fn()
		expect(objectUtil.stringifyOrNullUndefined(result)).toEqual(objectUtil.stringifyOrNullUndefined(this._termResult))
	}
}
