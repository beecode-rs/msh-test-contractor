import { contractFactory } from '../contract/contractor-factory'
import { mocker } from '../mocker/mocker'
import { ContractMockRevertFns } from '../types'
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

export default contractFactory(require('./subject-service'), 'subjectService', {
  strategyFromContractFunction: {
    terms: [
      {
        mock: {
          jest: (_jest: any): ContractMockRevertFns => {
            return [mocker.contract(subjectConstructorStrategyContract)]
          },
        },
        params: [{ contract: dummyContract, fnName: '_constructor', term: {} }],
        result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName },
      },
      {
        mock: {
          jest: (_jest: any): ContractMockRevertFns => {
            return [mocker.contract(subjectClassFunctionStrategyContract)]
          },
        },
        params: [{ contract: dummyContract, fnName: 'a', term: { constructorParams: [] } }],
        result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName, _constructorParams: [], _fnName: 'a' },
      },
      {
        mock: {
          jest: (_jest: any): ContractMockRevertFns => {
            return [mocker.contract(subjectFunctionStrategyContract)]
          },
        },
        params: [{ contract: dummyContract, fnName: 'a', term: {} }],
        result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName, _fnName: 'a' },
      },
    ],
  },
})
