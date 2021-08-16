import { contractFactory } from '../contractor-factory'
import { mocker } from '../mocker'
import { ContractMockRevertFns } from '../types/index'
import loggerContract from './logger.contract'

const mock = {
  jest: (_jest: any): ContractMockRevertFns => {
    return [mocker(loggerContract, 'debug')]
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
})
