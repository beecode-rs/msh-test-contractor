import { JestSpyClassFunctionStrategy } from '#/jest-spy/jest-spy-class-function-strategy'
import { JestSpyFunctionStrategy } from '#/jest-spy/jest-spy-function-strategy'
import { JestSpyStrategy } from '#/jest-spy/jest-spy-strategy'
import { ContractTerm } from '#/types/index'

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
