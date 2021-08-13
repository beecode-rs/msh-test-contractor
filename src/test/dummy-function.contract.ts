import { Contract, ContractMockRevertFn } from '../contract-type/contract'
import { mocker } from '../mocker'
import loggerContract from './logger.contract'

export default {
  add: {
    subject: {
      fn: 'add',
      source: require('./dummy-function').dummyFunction,
    },
    mock: {
      jest: (_jest: any): ContractMockRevertFn => {
        const restoreAll = [mocker(loggerContract.message)]

        return (): void => {
          restoreAll.forEach((um) => um())
        }
      },
    },
    terms: [
      {
        params: [1, 2],
        result: 3,
      },
    ],
  },
  sub: {
    subject: {
      fn: 'sub',
      source: require('./dummy-function').dummyFunction,
    },
    terms: [
      {
        params: [1, 2],
        result: -1,
      },
    ],
  },
} as { [k: string]: Contract }
