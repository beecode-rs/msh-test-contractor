import { JestSpyClassFunctionStrategy } from '#src/jest-spy/jest-spy-class-function-strategy'
import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy'
import { type JestSpyStrategy } from '#src/jest-spy/jest-spy-strategy'
import { type ContractTerm } from '#src/types/index'

export const jestSpyService = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	strategyFromTerms: (params: { terms: ContractTerm[]; mockClassParams?: any[]; name: string }): JestSpyStrategy => {
		const { terms, mockClassParams, name } = params
		if (terms.length === 0) {
			throw new Error('Terms missing')
		}
		const [{ constructorParams } = { constructorParams: undefined }] = terms
		if (mockClassParams && constructorParams) {
			return new JestSpyClassFunctionStrategy({ mockClassParams, name, terms })
		}

		return new JestSpyFunctionStrategy({ name, terms })
	},
}
