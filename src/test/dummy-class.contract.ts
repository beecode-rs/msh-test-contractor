import { contractFactory } from '../contractor-factory'

export default contractFactory(require('./dummy-class'), 'DummyClass', {
  _constructor: {
    terms: [
      {
        params: [1, 2],
        result: { __a: 1, __b: 2 },
      },
    ],
  },
  add: {
    terms: [
      {
        constructorParams: [1, 2],
        params: [3],
        result: 6,
      },
    ],
  },
})
