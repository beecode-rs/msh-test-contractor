import { VitestSpyClassFunctionStrategy } from '#src/vitest-spy/vitest-spy-class-function-strategy'
import { VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy'
import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy'
import { type ContractTerm } from '#src/types/index'

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
