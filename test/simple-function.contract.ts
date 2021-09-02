import { contractFactory } from '../src/contract/contractor-factory'
import * as simpleFunction from './simple-function'

export default contractFactory(
  { module: simpleFunction },
  {
    simpleFunction: {
      terms: [
        {
          params: [1],
          result: 1,
        },
        {
          params: [11],
          result: new Error('number larger the ten'),
        },
      ],
    },
  }
)
