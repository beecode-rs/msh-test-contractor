import { type ContractTerm } from '#src/business/model/contract-model.js'
import { VitestSpyClassFunctionStrategy } from '#src/business/component/vitest-spy/vitest-spy-class-function-strategy.js'
import { VitestSpyFunctionStrategy } from '#src/business/component/vitest-spy/vitest-spy-function-strategy.js'
import { type VitestSpyStrategy } from '#src/business/component/vitest-spy/vitest-spy-strategy.js'

export const vitestSpyService = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	strategyFromTerms: (params: { terms: ContractTerm[]; mockClassParams?: any[]; name: string }): VitestSpyStrategy => {
		const { terms, mockClassParams, name } = params
		if (terms.length === 0) {
			throw new Error('Terms missing')
		}
		const [{ constructorParams } = { constructorParams: undefined }] = terms
		if (mockClassParams && constructorParams) {
			return new VitestSpyClassFunctionStrategy({ mockClassParams, name, terms })
		}

		return new VitestSpyFunctionStrategy({ name, terms })
	},
}
