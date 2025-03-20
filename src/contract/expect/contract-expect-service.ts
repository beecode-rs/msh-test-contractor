import { ContractExpectAnyEqualStrategy } from '#src/contract/expect/contract-expect-any-equal-strategy'
import { ContractExpectFunctionResultEqualStrategy } from '#src/contract/expect/contract-expect-function-result-equal-strategy'
import { ContractExpectThrowErrorStrategy } from '#src/contract/expect/contract-expect-throw-error-strategy'
import { type ContractTerm } from '#src/types/index'

export interface ContractExpectStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
