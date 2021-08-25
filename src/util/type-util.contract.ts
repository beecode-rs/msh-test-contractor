import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'

const selfContract = contractFactory(require('./type-util'), 'typeUtil', {
  isClass: {
    mock: {
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.function(selfContract, 'isObject'), mocker.function(selfContract, 'isFunction')]
      },
    },
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
  isFunction: {
    terms: [
      {
        params: [Date],
        result: true,
      },
      {
        params: [{}],
        result: false,
      },
      {
        params: [
          (): void => {
            return
          },
        ],
        result: true,
      },
    ],
  },
})

export default selfContract
