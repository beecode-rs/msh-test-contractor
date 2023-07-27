import { contractFactory } from 'src/contract/contractor-factory'
import { SpecialFnName } from 'src/enum/special-fn-name'
import { mocker } from 'src/mocker/mocker'
import subjectClassFunctionStrategyContract from 'src/subject/subject-class-function-strategy.contract'
import subjectConstructorStrategyContract from 'src/subject/subject-constructor-strategy.contract'
import subjectFunctionStrategyContract from 'src/subject/subject-function-strategy.contract'
import { ContractMockRevertFns } from 'src/types'

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
					mock: (): ContractMockRevertFns => {
						return [mocker.contract(subjectConstructorStrategyContract).mockRestore]
					},
					params: [{ contract: dummyContract, fnName: SpecialFnName.CONSTRUCTOR, term: {} }],
					result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName },
				},
				{
					mock: (): ContractMockRevertFns => {
						return [mocker.contract(subjectClassFunctionStrategyContract).mockRestore]
					},
					params: [{ contract: dummyContract, fnName: 'a', term: { constructorParams: [] } }],
					result: {
						_fnName: 'a',
						_module: dummyContract.module,
						_subjectName: dummyContract.subjectName,
					},
				},
				{
					mock: (): ContractMockRevertFns => {
						return [mocker.contract(subjectFunctionStrategyContract).mockRestore]
					},
					params: [{ contract: dummyContract, fnName: 'a', term: {} }],
					result: { _fnName: 'a', _module: dummyContract.module, _subjectName: dummyContract.subjectName },
				},
			],
		},
	}
)
