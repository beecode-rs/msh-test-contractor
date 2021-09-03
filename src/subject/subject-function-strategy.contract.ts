import { contractFactory } from '../contract/contractor-factory'
import { SpecialFnName } from '../enum/special-fn-name'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types/index'

const dummyModule = {
  dummySubject: {
    a: (_a: string): string => _a,
  },
}

const dummyModuleFunction = { a: (_a: string): string => _a }
const dummySubjectName = 'dummySubject'
const dummyFnName = 'a'
const dummySelfFnName = SpecialFnName.SELF

const dummyConstructorParamsFactory = (): any[] => {
  return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName }, fnName: dummyFnName }]
}
const dummyConstructorFnParamsFactory = (): any[] => {
  return [{ subjectFromContract: { module: dummyModuleFunction, subjectName: dummyFnName }, fnName: dummySelfFnName }]
}

const selfContract = contractFactory(
  { module: require('./subject-function-strategy'), subjectName: 'SubjectFunctionStrategy' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
      terms: [
        {
          params: dummyConstructorParamsFactory(),
          result: { _subjectName: dummySubjectName, _module: dummyModule, _fnName: dummyFnName },
        },
        {
          params: dummyConstructorFnParamsFactory(),
          result: { _subjectName: dummyFnName, _module: dummyModuleFunction, _fnName: dummySelfFnName },
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
        jest: (): ContractMockRevertFns => {
          return [mocker.function(selfContract, 'fn').mockRestore]
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
  }
)

export default selfContract
