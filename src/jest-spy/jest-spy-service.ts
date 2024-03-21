import { JestSpyClassFunctionStrategy } from '#src/jest-spy/jest-spy-class-function-strategy'
import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy'
import { JestSpyStrategy } from '#src/jest-spy/jest-spy-strategy'
import { ContractTerm } from '#src/types'

export const jestSpyService = {
	strategyFromTerms: (params: { terms: ContractTerm[]; mockClassParams?: any[]; name: string }): JestSpyStrategy => {
		const { terms, mockClassParams, name } = params
		if (terms.length === 0) {
			throw new Error('Terms missing')
		}
		const { constructorParams } = terms[0]
		if (mockClassParams && constructorParams) {
			return new JestSpyClassFunctionStrategy({ mockClassParams, name, terms })
		}

		return new JestSpyFunctionStrategy({ name, terms })
	},
}
