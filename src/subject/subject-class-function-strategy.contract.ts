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
const dummyFnName = 'a'
const dummyConstructorParams: any[] = []

const dummyConstructorParamsFactory = (): any[] => {
  return [
    {
      subjectFromContract: { module: dummyModule, subjectName: dummySubjectName },
      constructorParams: dummyConstructorParams,
      fnName: dummyFnName,
    },
  ]
}

const selfContract = contractFactory(require('./subject-class-function-strategy'), 'SubjectClassFunctionStrategy', {
  _constructor: {
    terms: [
      {
        params: dummyConstructorParamsFactory(),
        result: {
          _subjectName: dummySubjectName,
          _module: dummyModule,
          _constructorParams: dummyConstructorParams,
          _fnName: dummyFnName,
        },
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
        params: [{ params: ['testString'] }],
        result: 'testString',
      },
    ],
  },
})

export default selfContract
