import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types/index'

class DummyClass {
  a(_a: string): string {
    return _a
  }
}

const dummyModule = { DummyClass }
const dummySubjectName = 'DummyClass'

const dummyConstructorParamsFactory = (): any[] => {
  return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }]
}

const selfContract = contractFactory(
  { module: require('./subject-constructor-strategy'), subjectName: 'SubjectConstructorStrategy' },
  {
    CONSTRUCTOR: {
      terms: [
        {
          params: dummyConstructorParamsFactory(),
          result: { _subjectName: dummySubjectName, _module: dummyModule },
        },
      ],
    },
    fn: {
      terms: [
        {
          constructorParams: dummyConstructorParamsFactory(),
          params: [],
          result: DummyClass,
        },
      ],
    },
    exec: {
      mock: {
        jest: (): ContractMockRevertFns => {
          return [mocker.function(selfContract, 'fn').mockRestore]
        },
      },
      terms: [
        {
          constructorParams: dummyConstructorParamsFactory(),
          params: [{ params: [] }],
          result: new DummyClass(),
        },
      ],
    },
  }
)

export default selfContract
