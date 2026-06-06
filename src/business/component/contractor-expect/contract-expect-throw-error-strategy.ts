/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { expect } from 'vitest'

import { type ContractExpectStrategy } from '#src/business/component/contractor-expect/contract-expect-service.js'
import { type ContractTerm } from '#src/business/model/contract-model.js'

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
