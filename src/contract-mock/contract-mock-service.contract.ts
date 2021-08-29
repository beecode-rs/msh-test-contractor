import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'
import mockJestEmptyStrategyContract from './mock-jest-empty-strategy.contract'
import mockJestStrategyContract from './mock-jest-strategy.contract'

export default contractFactory(require('./contract-mock-service.ts'), 'contractMockService', {
  strategyFromFunctionMock: {
    mock: {
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.contract(mockJestStrategyContract), mocker.contract(mockJestEmptyStrategyContract)]
      },
    },
    terms: [
      {
        params: [],
        result: {},
      },
    ],
  },
})
