import { Contract, ContractMockRevertFn } from '../contract-type/contract'
import dateContract from '../global-contract/date.contract'
import { mocker } from '../mocker'

const self = {
  name: 'logger',
  module: require('./logger'),
  fn: {
    _message: {
      mock: {
        jest: (): ContractMockRevertFn => {
          const restoreAll = [mocker(dateContract, '_constructor')]
          return (): void => {
            restoreAll.forEach((um) => um())
          }
        },
      },
      terms: [
        {
          params: ['type', 'test-message'],
          result: '2020-01-01T00:00:00.000Z:TYPE:test-message',
        },
        {
          params: ['DEBUG', 'test-message'],
          result: '2020-01-01T00:00:00.000Z:DEBUG:test-message',
        },
        {
          params: ['error', 'test-message'],
          result: '2020-01-01T00:00:00.000Z:ERROR:test-message',
        },
        {
          params: ['DEBUG', 'add 1 and 2'],
          result: '2020-01-01T00:00:00.000Z:DEBUG:add 1 and 2',
        },
        {
          params: ['DEBUG', 'sub 1 and 2'],
          result: '2020-01-01T00:00:00.000Z:DEBUG:sub 1 and 2',
        },
      ],
    },
    debug: {
      mock: {
        jest: (): ContractMockRevertFn => {
          const restoreAll = [mocker(self, '_message')]
          return (): void => {
            restoreAll.forEach((um) => um())
          }
        },
      },
      terms: [
        {
          params: ['test-message'],
          result: '2020-01-01T00:00:00.000Z:DEBUG:test-message',
        },
        {
          params: ['add 1 and 2'],
          result: '2020-01-01T00:00:00.000Z:DEBUG:add 1 and 2',
        },
        {
          params: ['sub 1 and 2'],
          result: '2020-01-01T00:00:00.000Z:DEBUG:sub 1 and 2',
        },
      ],
    },
  },
} as Contract

export default self
