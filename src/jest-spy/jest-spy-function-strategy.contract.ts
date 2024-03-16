import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'
import { ContractTerm } from '#src/types'

const dummyTerms: { terms: ContractTerm[] } = {
	terms: [
		{ params: [1, 2, 3], result: 6 },
		{ params: [2, 3, 4], result: 7 },
		{ params: [3, 4, 5], result: 8 },
	],
}

const selfContract = contractFactory(
	{ module: require('./jest-spy-function-strategy'), subjectName: 'JestSpyFunctionStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [dummyTerms],
					result: { _terms: dummyTerms.terms },
				},
			],
		},
		mockImplementationFactory: {
			terms: [
				{
					constructorParams: [dummyTerms],
					params: [],
					result: dummyTerms.terms[0].result,
					returnFnParams: dummyTerms.terms[0].params,
				},
			],
		},
	}
)

export default selfContract
