import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'

const dummyModule = {
  dummySubject: {
    a: (_a: string): string => _a,
  },
}

const dummyModuleFunction = { a: (_a: string): string => _a }
const dummySubjectName = 'dummySubject'
const dummyFnName = 'a'

const dummyConstructorParamsFactory = (): any[] => {
  return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName }, fnName: dummyFnName }]
}
const dummyConstructorFnParamsFactory = (): any[] => {
  return [{ subjectFromContract: { module: dummyModuleFunction }, fnName: dummyFnName }]
}

const selfContract = contractFactory(require('./subject-function-strategy'), 'SubjectFunctionStrategy', {
  _constructor: {
    terms: [
      {
        params: dummyConstructorParamsFactory(),
        result: { _subjectName: dummySubjectName, _module: dummyModule, _fnName: dummyFnName },
      },
      {
        params: dummyConstructorFnParamsFactory(),
        result: { _module: dummyModuleFunction, _fnName: dummyFnName },
      },
    ],
  },
  fn: {
    terms: [
      {
        constructorParams: dummyConstructorParamsFactory(),
        params: [],
        result: dummyModule.dummySubject.a,
      },
      {
        constructorParams: dummyConstructorFnParamsFactory(),
        params: [],
        result: dummyModuleFunction.a,
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
        params: [{ params: ['testParam'] }],
        result: 'testParam',
      },
      {
        constructorParams: dummyConstructorFnParamsFactory(),
        params: [{ params: ['testParam'] }],
        result: 'testParam',
      },
    ],
  },
})

export default selfContract
