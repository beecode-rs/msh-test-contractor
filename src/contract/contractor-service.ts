import { type ContractTerm } from '#src/types/index'

export const contractorService = {
	testDescription: (params: { fnName: string }): string => {
		const { fnName } = params

		return `${fnName} [contract]`
	},
	testName: (params: { term: ContractTerm }): string => {
		const {
			term: { params: termParams, result },
		} = params

		return `input: ${JSON.stringify(termParams)}   output: ${JSON.stringify(result)}`
	},
}
