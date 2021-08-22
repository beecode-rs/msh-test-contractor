import { contractFactory } from '../contract/contractor-factory'

export default contractFactory(require('./fn-util'), 'fnUtil', {
  isConstructor: {
    terms: [
      {
        params: ['someFnName'],
        result: false,
      },
      {
        params: ['_constructor'],
        result: true,
      },
    ],
  },
})
