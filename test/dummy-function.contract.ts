import { contractFactory } from '../src/contract/contractor-factory'
import { mocker } from '../src/mocker/mocker'
import { ContractMockRevertFns } from '../src/types/index'
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
  errorIfMoreThenTen: {
    terms: [
      {
        params: [1],
        result: 1,
      },
      {
        params: [11],
        result: new Error('More then 10'),
      },
    ],
  },
})
