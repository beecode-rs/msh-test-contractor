import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types/index'
// import { SpecialFnName } from '../enum/special-fn-name'
// import { mocker } from '../mocker/mocker'
// import { ContractMockRevertFns } from '../types/index'

class DummySubject {
  a(_a: string): string {
    return _a
  }
}

const dummyModule = { DummySubject }
const dummySubjectName = 'DummySubject'

const dummyConstructorParams = (): any => {
  return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }]
}

const selfContract = contractFactory(require('./subject-constructor-strategy'), 'SubjectConstructorStrategy', {
  _constructor: {
    terms: [
      {
        params: dummyConstructorParams(),
        result: { _subjectName: dummySubjectName, _module: dummyModule },
      },
    ],
  },
  fn: {
    terms: [
      {
        constructorParams: dummyConstructorParams(),
        params: [],
        result: DummySubject,
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
        constructorParams: dummyConstructorParams(),
        params: [],
        result: DummySubject,
      },
    ],
  },
})

export default selfContract
