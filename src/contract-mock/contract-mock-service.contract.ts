import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'
import mockJestEmptyStrategyContract from './mock-jest-empty-strategy.contract'
import mockJestStrategyContract from './mock-jest-strategy.contract'

export default contractFactory(
  { module: require('./contract-mock-service.ts'), subjectName: 'contractMockService' },
  {
    strategyFromFunctionMock: {
      mock: (): ContractMockRevertFns => {
        return [mocker.contract(mockJestStrategyContract), mocker.contract(mockJestEmptyStrategyContract)].map(
          (f) => f.mockRestore
        )
      },
      terms: [
        {
          params: [],
          result: {},
        },
      ],
    },
  }
)
