import { contractFactory } from '#src/contract/contractor-factory.js'
import { SpecialFnName } from '#src/enum/special-fn-name.js'
import { mocker } from '#src/mocker/mocker.js'
import subjectClassFunctionStrategyContract from '#src/subject/subject-class-function-strategy.contract.js'
import subjectConstructorStrategyContract from '#src/subject/subject-constructor-strategy.contract.js'
import subjectFunctionStrategyContract from '#src/subject/subject-function-strategy.contract.js'
import { type ContractMockRevertFns } from '#src/types/index.js'

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
	// eslint-disable-next-line @typescript-eslint/no-require-imports
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
