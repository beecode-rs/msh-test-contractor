import { contractFactory } from '../contract/contractor-factory'

const dummyContract = { dummy: 'contract' }

export default contractFactory(require('./mocker-jest-object-strategy'), 'MockerJestObjectStrategy', {
  _constructor: {
    terms: [
      {
        params: [dummyContract],
        result: { _contract: dummyContract, _spies: [] },
      },
    ],
  },
})
