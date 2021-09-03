import { contractFactory } from '../contract/contractor-factory'
import { SpecialFnName } from '../enum/special-fn-name'
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

const selfContract = contractFactory(
  { module: require('./subject-class-function-strategy'), subjectName: 'SubjectClassFunctionStrategy' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
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
        jest: (): ContractMockRevertFns => {
          return [mocker.function(selfContract, 'fn').mockRestore]
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
  }
)

export default selfContract
