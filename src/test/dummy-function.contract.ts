import { contractFactory } from '../contractor-factory'
import { mocker } from '../mocker'
import { ContractMockRevertFns } from '../types'
import dummyClassContract from './dummy-class.contract'
import loggerContract from './logger.contract'

const mock = {
  jest: (_jest: any): ContractMockRevertFns => {
    return [mocker.contract(loggerContract)]
  },
}
export default contractFactory(require('./dummy-function'), 'dummyFunction', {
  add: {
    mock,
    terms: [
      {
        params: [1, 2],
        result: 3,
      },
    ],
  },
  sub: {
    mock,
    terms: [
      {
        params: [1, 2],
        result: -1,
      },
    ],
  },
  callClass: {
    mock: {
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.contract(dummyClassContract)]
      },
    },
    terms: [
      {
        params: [1, 2, 3],
        result: 6,
      },
    ],
  },
  callClassMultiFun: {
    mock: {
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.contract(dummyClassContract)]
      },
    },
    terms: [
      {
        params: [1, 2, 3, 1],
        result: 8,
      },
    ],
  },
})
