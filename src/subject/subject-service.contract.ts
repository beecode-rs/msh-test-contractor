import { contractFactory } from '#/contract/contractor-factory.js'
import { SpecialFnName } from '#/enum/special-fn-name.js'
import { mocker } from '#/mocker/mocker.js'
import subjectClassFunctionStrategyContract from '#/subject/subject-class-function-strategy.contract.js'
import subjectConstructorStrategyContract from '#/subject/subject-constructor-strategy.contract.js'
import subjectFunctionStrategyContract from '#/subject/subject-function-strategy.contract.js'
import { ContractMockRevertFns } from '#/types/index.js'

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
