import { contractFactory } from '../contract/contractor-factory'
import { ContractJestMock } from '../types/index'

const dummyJestMock: ContractJestMock = (_jest, _options) => {
  return []
}

export default contractFactory(require('./mock-jest-strategy'), 'MockJestStrategy', {
  _constructor: {
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
})
