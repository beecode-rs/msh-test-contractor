import { contractFactory } from '../contract/contractor-factory'
import { ContractFnTerm } from '../types/index'

const dummyTerms: { terms: ContractFnTerm[]; mockClassParams: any[] } = {
  terms: [
    { params: [1, 2, 3], result: 6, constructorParams: [1, 2] },
    { params: [2, 3, 4], result: 7, constructorParams: [1, 2] },
    { params: [3, 4, 5], result: 8, constructorParams: [1, 2] },
  ],
  mockClassParams: [1, 2],
}

const selfContract = contractFactory(require('./jest-spy-class-function-strategy'), 'JestSpyClassFunctionStrategy', {
  _constructor: {
    terms: [
      {
        params: [dummyTerms],
        result: { _terms: dummyTerms.terms, _mockClassParams: dummyTerms.mockClassParams },
      },
    ],
  },
  mockImplementationFactory: {
    // mock: {
    //   // TODO need to mock jestSpyFunctionStrategy
    //   jest: (_jest: any): ContractMockRevertFns => {
    //     return [mocker.contract(jestSpyFunctionStrategyContract)] // max call stack ??
    //   },
    // },
    terms: [
      {
        constructorParams: [dummyTerms],
        params: [],
        returnFnParams: dummyTerms.terms[1].params,
        result: dummyTerms.terms[1].result,
      },
    ],
  },
})

export default selfContract
