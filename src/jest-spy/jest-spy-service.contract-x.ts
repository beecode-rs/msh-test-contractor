import { contractFactory } from '../contract/contractor-factory'
// import { mocker } from '../mocker/mocker'
import { ContractFnTerm } from '../types'
// import jestSpyFunctionStrategyContract from './jest-spy-function-strategy.contract'

const dummyParams: { terms: ContractFnTerm[]; mockClassParams: any[] } = {
  terms: [
    { params: [1, 2, 3], result: 6 },
    { params: [2, 3, 4], result: 7 },
    { params: [3, 4, 5], result: 8 },
  ],
  mockClassParams: [],
}

const selfContract = contractFactory(require('./jest-spy-service'), 'jestSpyService', {
  strategyFromTerms: {
    // mock: {
    //   jest: (_jest: any): ContractMockRevertFns => {
    //     return [mocker.contract(jestSpyFunctionStrategyContract)] // max call stack ??
    //   },
    // },
    terms: [
      // TODO add term when result is error
      {
        params: [dummyParams],
        result: {},
      },
    ],
  },
})

export default selfContract
