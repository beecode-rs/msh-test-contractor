import { contractFactory } from '../contract/contractor-factory'
import { SpecialFnName } from '../enum/special-fn-name'
import { ContractJestMock } from '../types/index'

const dummyJestMock: ContractJestMock = (_options) => {
  return []
}

export default contractFactory(
  { module: require('./mock-jest-strategy'), subjectName: 'MockJestStrategy' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
      terms: [
        {
          params: [],
          result: { _jestMock: undefined },
        },
        {
          params: [dummyJestMock],
          result: { _jestMock: dummyJestMock },
        },
      ],
    },
  }
)
