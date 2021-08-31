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

const selfContract = contractFactory(require('./subject-constructor-strategy'), 'SubjectConstructorStrategy', {
  _constructor: {
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
      jest: (_jest: any): ContractMockRevertFns => {
        return [mocker.function(selfContract, 'fn')]
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
})

export default selfContract
