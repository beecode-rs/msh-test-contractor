import { ContractExpectStrategy } from '#/contract/expect/contract-expect-service.js'
import { ContractTerm } from '#/types/index.js'
import { objectUtil } from '#/util/object-util.js'

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
