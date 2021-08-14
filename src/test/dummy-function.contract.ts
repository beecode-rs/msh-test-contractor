import { Contract, ContractMockRevertFn } from '../contract-type/contract'
import { mocker } from '../mocker'
import loggerContract from './logger.contract'

const mock = {
  jest: (): ContractMockRevertFn => {
    const restoreAll = [mocker(loggerContract, 'debug')]

    return (): void => {
      restoreAll.forEach((um) => um())
    }
  },
}
export default {
  name: 'dummyFunction',
  module: require('./dummy-function'),
  fn: {
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
  },
} as Contract
