import { expect } from '@jest/globals'

import { ContractExpectStrategy } from '#/contract/expect/contract-expect-service'
import { ContractTerm } from '#/types'
import { objectUtil } from '#/util/object-util'

export class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
	protected readonly _termResult: any

	constructor(params: { term: ContractTerm }) {
		const { term } = params
		this._termResult = term.result
	}

	async test(fn: () => any): Promise<void> {
		const result = await fn()
		expect(objectUtil.stringifyOrNullUndefined(result)).toEqual(objectUtil.stringifyOrNullUndefined(this._termResult))
	}
}
