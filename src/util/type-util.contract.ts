import { contractFactory } from '../contract/contractor-factory'

export default contractFactory(require('./type-util'), 'typeUtil', {
  isClass: {
    terms: [
      {
        params: [Date],
        result: true,
      },
      {
        params: [{}],
        result: false,
      },
    ],
  },
  isObject: {
    terms: [
      {
        params: [Date],
        result: true,
      },
      {
        params: [{}],
        result: true,
      },
      {
        params: [1],
        result: false,
      },
    ],
  },
})
