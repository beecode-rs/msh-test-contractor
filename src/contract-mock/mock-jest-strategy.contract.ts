import { contractFactory } from '../contract/contractor-factory'
import { ContractJestMock } from '../types/index'

const dummyJestMock: ContractJestMock = (_options) => {
  return []
}

export default contractFactory(
  { module: require('./mock-jest-strategy'), subjectName: 'MockJestStrategy' },
  {
    CONSTRUCTOR: {
      terms: [
        {
          params: [],
          result: { _jestMock: undefined },
        },
        {
          params: [dummyJestMock],
          result: { _jestMock: dummyJestMock },
        },
      ],
    },
  }
)
