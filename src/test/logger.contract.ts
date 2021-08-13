import { Contract, ContractMockRevertFn } from '../contract-type/contract'
import newDateContract from '../global-contract/new-date.contract'
import { mocker } from '../mocker'

const self = {
  message: {
    subject: {
      fn: '_message',
      source: require('./logger').logger,
    },
    mock: {
      jest: (): ContractMockRevertFn => {
        const restoreAll = [mocker(newDateContract)]
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
    ],
  },
  debug: {
    subject: {
      fn: 'debug',
      source: require('./logger').logger,
    },
    mock: {
      jest: (): ContractMockRevertFn => {
        const restoreAll = [mocker(self.message)]
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
    ],
  },
} as { [k: string]: Contract }

export default self
