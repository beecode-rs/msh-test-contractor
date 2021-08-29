import { contractFactory } from '../contract/contractor-factory'

export default contractFactory(require('./mock-jest-empty-strategy'), 'MockJestEmptyStrategy', {
  _constructor: {
    terms: [
      {
        params: [],
        result: {},
      },
      {
        params: [{ jest: [] }],
        result: { _jestMock: undefined },
      },
    ],
  },
})
