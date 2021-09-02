import { contractFactory } from '../contract/contractor-factory'

export default contractFactory(
  { module: require('./mock-jest-empty-strategy'), subjectName: 'MockJestEmptyStrategy' },
  {
    CONSTRUCTOR: {
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
  }
)
