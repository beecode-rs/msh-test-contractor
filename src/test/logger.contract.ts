import { contractFactory } from '../contract/contractor-factory'
import dateContract from '../global-contract/date.contract'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'

const selfContract = contractFactory(require('./logger'), 'logger', {
  _message: {
    mock: {
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.contract(dateContract)]
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
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.function(selfContract, '_message')]
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
})

export default selfContract
