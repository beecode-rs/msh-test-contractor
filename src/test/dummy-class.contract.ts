import { contractFactory } from '../contractor-factory'
import { mocker } from '../mocker'
import { ContractMockRevertFns } from '../types'
import dummyFunctionContract from './dummy-function.contract'

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
  sub: {
    terms: [
      {
        constructorParams: [1, 2],
        params: [1],
        result: 2,
      },
    ],
  },
  externalAdd: {
    mock: {
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.contract(dummyFunctionContract)]
      },
    },
    terms: [
      {
        constructorParams: [1, 2],
        params: [3],
        result: 6,
      },
    ],
  },
})
