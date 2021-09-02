import { contractFactory } from '../contract/contractor-factory'

const dummyContract = { dummy: 'contract' }

export default contractFactory(
  { module: require('./mocker-jest-object-strategy'), subjectName: 'MockerJestObjectStrategy' },
  {
    CONSTRUCTOR: {
      terms: [
        {
          params: [dummyContract],
          result: { _contract: dummyContract, _spies: [] },
        },
      ],
    },
  }
)
