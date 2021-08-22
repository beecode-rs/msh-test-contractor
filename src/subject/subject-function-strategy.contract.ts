import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'

const dummyModule = {
  dummySubject: {
    a: (_a: string): string => _a,
  },
}
const dummySubjectName = 'dummySubject'
const dummyFnName = 'a'

const dummyConstructorParams = (): any => {
  return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName }, fnName: dummyFnName }]
}

const selfContract = contractFactory(require('./subject-function-strategy'), 'SubjectFunctionStrategy', {
  _constructor: {
    terms: [
      {
        params: dummyConstructorParams(),
        result: { _subjectName: dummySubjectName, _module: dummyModule, _fnName: dummyFnName },
      },
    ],
  },
  fn: {
    terms: [
      {
        constructorParams: dummyConstructorParams(),
        params: [],
        result: dummyModule.dummySubject.a,
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
        params: [{ params: ['testParam'] }],
        result: 'testParam',
      },
    ],
  },
})

export default selfContract
