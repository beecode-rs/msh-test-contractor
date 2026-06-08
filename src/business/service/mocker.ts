/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type MockInstance, vi } from 'vitest'

import { mockerService } from '#src/business/component/mocker/mocker-service.js'
import { VitestSpyFunctionStrategy } from '#src/business/component/vitest-spy/vitest-spy-function-strategy.js'
import { type AnyContract, type ContractMockRevertFn, type PropType } from '#src/business/model/contract-model.js'
import { SpecialFnName } from '#src/business/model/special-fn-name.js'
import { fnUtil } from '#src/util/fn-util.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MockerContractResult<SPY_INSTANCE = MockInstance<any>> = {
	spy: SPY_INSTANCE
	mockRestore: ContractMockRevertFn
}

export const mocker = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-parameters
	contract: <SPY_INSTANCE = MockInstance<any>, CONTRACT extends AnyContract = any>(
		contract: CONTRACT
	): MockerContractResult<SPY_INSTANCE> => {
		const mockerStrategy = mockerService.strategyFromContract(contract)
		const spy = mockerStrategy.contractSpy()
		const mockRestore = (): void => {
			mockerStrategy.mockRestore()
		}

		return { mockRestore, spy }
	},
	function: <CONTRACT extends AnyContract, CONTRACT_FN_KEY extends Extract<keyof PropType<CONTRACT, 'fns'>, string>>( // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
		contract: CONTRACT,
		fnName: CONTRACT_FN_KEY
	): MockerContractResult => {
		const { module, subjectName, fns } = contract
		const { terms } = fns[fnName]!

		const getSpy = (): MockInstance => {
			if (fnUtil.isConstructor(fnName)) {
				return vi.spyOn(module, subjectName)
			}
			if (SpecialFnName.CONSTRUCTOR in fns) {
				return vi.spyOn(module[subjectName].prototype, fnName)
			}

			return vi.spyOn(module[subjectName], fnName)
		}
		const spy = getSpy()

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!terms) {
			throw new Error(`Terms not found in function ${fnName} for module ${subjectName}`) // eslint-disable-line @typescript-eslint/restrict-template-expressions
		}

		const vitestSpyFunction = new VitestSpyFunctionStrategy({ name: `${subjectName}.${fnName}`, terms }) // eslint-disable-line @typescript-eslint/restrict-template-expressions
		spy.mockImplementation(vitestSpyFunction.mockImplementationFactory())

		const mockRestore = (): void => {
			spy.mockRestore()
		}

		return { mockRestore, spy }
	},
}
