import { contractFactory } from '#/contract/contractor-factory.js'
import { SpecialFnName } from '#/enum/special-fn-name.js'
import { ContractTerm } from '#/types/index.js'

const dummyTerms: { terms: ContractTerm[]; mockClassParams: any[] } = {
	mockClassParams: [1, 2],
	terms: [
		{ constructorParams: [1, 2], params: [1, 2, 3], result: 6 },
		{ constructorParams: [1, 2], params: [2, 3, 4], result: 7 },
		{ constructorParams: [1, 2], params: [3, 4, 5], result: 8 },
	],
}

const selfContract = contractFactory(
	{ module: require('./jest-spy-class-function-strategy'), subjectName: 'JestSpyClassFunctionStrategy' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [dummyTerms],
					result: { _mockClassParams: dummyTerms.mockClassParams, _terms: dummyTerms.terms },
				},
			],
		},
		mockImplementationFactory: {
			//   // TODO need to mock jestSpyFunctionStrategy
			// mock:(): ContractMockRevertFns => {
			//     return [mocker.contract(jestSpyFunctionStrategyContract)] // max call stack ??
			// },
			terms: [
				{
					constructorParams: [dummyTerms],
					params: [],
					result: dummyTerms.terms[1].result,
					returnFnParams: dummyTerms.terms[1].params,
				},
			],
		},
	}
)

export default selfContract
