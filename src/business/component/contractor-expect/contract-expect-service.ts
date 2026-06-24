import { ContractExpectAnyEqualStrategy } from '#src/business/component/contractor-expect/contract-expect-any-equal-strategy.js'
import { ContractExpectFunctionResultEqualStrategy } from '#src/business/component/contractor-expect/contract-expect-function-result-equal-strategy.js'
import { ContractExpectThrowErrorStrategy } from '#src/business/component/contractor-expect/contract-expect-throw-error-strategy.js'
import { type ContractTerm } from '#src/business/model/contract-model.js'

export interface ContractExpectStrategy {
	test(fn: () => any): Promise<void> // eslint-disable-line @typescript-eslint/no-explicit-any
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
