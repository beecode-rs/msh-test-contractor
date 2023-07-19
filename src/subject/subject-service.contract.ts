import { contractFactory } from '#/contract/contractor-factory'
import { SpecialFnName } from '#/enum/special-fn-name'
import { mocker } from '#/mocker/mocker'
import subjectClassFunctionStrategyContract from '#/subject/subject-class-function-strategy.contract'
import subjectConstructorStrategyContract from '#/subject/subject-constructor-strategy.contract'
import subjectFunctionStrategyContract from '#/subject/subject-function-strategy.contract'
import { ContractMockRevertFns } from '#/types/index'

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
