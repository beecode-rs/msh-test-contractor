import { contractFactory } from '../contract/contractor-factory'
import { SpecialFnName } from '../enum/special-fn-name'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types/index'
import subjectClassFunctionStrategyContract from './subject-class-function-strategy.contract'
import subjectConstructorStrategyContract from './subject-constructor-strategy.contract'
import subjectFunctionStrategyContract from './subject-function-strategy.contract'

class DummyClass {
  a(_a: string): string {
    return _a
  }
}

const dummyContract = {
  module: { DummyClass },
  subjectName: 'DummyClass',
}

export default contractFactory(
  { module: require('./subject-service'), subjectName: 'subjectService' },
  {
    strategyFromContractFunction: {
      terms: [
        {
          mock: {
            jest: (): ContractMockRevertFns => {
              return [mocker.contract(subjectConstructorStrategyContract).mockRestore]
            },
          },
          params: [{ contract: dummyContract, fnName: SpecialFnName.CONSTRUCTOR, term: {} }],
          result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName },
        },
        {
          mock: {
            jest: (): ContractMockRevertFns => {
              return [mocker.contract(subjectClassFunctionStrategyContract).mockRestore]
            },
          },
          params: [{ contract: dummyContract, fnName: 'a', term: { constructorParams: [] } }],
          result: {
            _module: dummyContract.module,
            _subjectName: dummyContract.subjectName,
            _constructorParams: [],
            _fnName: 'a',
          },
        },
        {
          mock: {
            jest: (): ContractMockRevertFns => {
              return [mocker.contract(subjectFunctionStrategyContract).mockRestore]
            },
          },
          params: [{ contract: dummyContract, fnName: 'a', term: {} }],
          result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName, _fnName: 'a' },
        },
      ],
    },
  }
)
