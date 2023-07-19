import { JestSpyClassFunctionStrategy } from '#/jest-spy/jest-spy-class-function-strategy.js'
import { JestSpyFunctionStrategy } from '#/jest-spy/jest-spy-function-strategy.js'
import { JestSpyStrategy } from '#/jest-spy/jest-spy-strategy.js'
import { ContractTerm } from '#/types/index.js'

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
