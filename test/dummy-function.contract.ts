import { contractFactory } from '../src/contract/contractor-factory'
import { mocker } from '../src/mocker/mocker'
import { ContractMockRevertFns } from '../src/types/index'
import dummyClassContract from './dummy-class.contract'
import loggerContract from './logger.contract'

export default contractFactory(
  {
    module: require('./dummy-function'),
    subjectName: 'dummyFunction',
    mock: {
      jest: (): ContractMockRevertFns => {
        return [mocker.contract(loggerContract).mockRestore, mocker.contract(dummyClassContract).mockRestore]
      },
    },
  },
  {
    add: {
      terms: [
        {
          params: [1, 2],
          result: 3,
        },
      ],
    },
    sub: {
      terms: [
        {
          params: [1, 2],
          result: -1,
        },
      ],
    },
    callClass: {
      terms: [
        {
          params: [1, 2, 3],
          result: 6,
        },
      ],
    },
    callClassMultiFun: {
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
  }
)
