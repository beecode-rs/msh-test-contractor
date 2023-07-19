import { ContractExpectAnyEqualStrategy } from '#/contract/expect/contract-expect-any-equal-strategy.js'
import { ContractExpectFunctionResultEqualStrategy } from '#/contract/expect/contract-expect-function-result-equal-strategy.js'
import { ContractExpectThrowErrorStrategy } from '#/contract/expect/contract-expect-throw-error-strategy.js'
import { ContractTerm } from '#/types/index.js'

export interface ContractExpectStrategy {
	test(fn: () => any): Promise<void>
}

export const contractExpectService = {
	fromTerm: (params: { term: ContractTerm }): ContractExpectStrategy => {
		const { term } = params
		if (term.result instanceof Error) {
			return new ContractExpectThrowErrorStrategy({ term })
		}
		if (term.returnFnParams) {
			return new ContractExpectFunctionResultEqualStrategy({ term })
		}

		return new ContractExpectAnyEqualStrategy({ term })
	},
}
