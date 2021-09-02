import { contractFactory } from '../contract/contractor-factory'
import { SpecialFnName } from '../enum/special-fn-name'

export default contractFactory(
  { module: require('./fn-util'), subjectName: 'fnUtil' },
  {
    isConstructor: {
      terms: [
        {
          params: ['someFnName'],
          result: false,
        },
        {
          params: [SpecialFnName.CONSTRUCTOR],
          result: true,
        },
      ],
    },
  }
)
