import { vi } from 'vitest'

import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy'
import { mockerService } from '#src/mocker/mocker-service'
import { type AnyContract, type ContractMockRevertFn, type PropType } from '#src/types/index'
import { fnUtil } from '#src/util/fn-util'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MockerContractResult<SPY = vi.Spied<any>> = {
	spy: SPY
	mockRestore: ContractMockRevertFn
}

export const mocker = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-parameters
	contract: <SPY = vi.Spied<any>, C extends AnyContract = any>(contract: C): MockerContractResult<SPY> => {
		const mockerStrategy = mockerService.strategyFromContract(contract)
		const spy = mockerStrategy.contractSpy()
		const mockRestore = (): void => {
			mockerStrategy.mockRestore()
		}

		return { mockRestore, spy }
	},
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	function: <C extends AnyContract, CFNK extends Extract<keyof PropType<C, 'fns'>, string>>(
		contract: C,
		fnName: CFNK
	): MockerContractResult => {
		const { module, subjectName, fns } = contract
		const { terms } = fns[fnName]!

		const spy = // eslint-disable-next-line no-ternary
			fnUtil.isConstructor(fnName)
				? vi.spyOn(module, subjectName)
				: // eslint-disable-next-line no-ternary
					terms[0]?.constructorParams // if function belongs to class mock prototype
					? vi.spyOn(module[subjectName].prototype, fnName)
					: vi.spyOn(module[subjectName], fnName)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!terms) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			throw new Error(`Terms not found in function ${fnName} for module ${subjectName}`)
		}

		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		const jestSpyFunction = new JestSpyFunctionStrategy({ name: `${subjectName}.${fnName}`, terms })
		spy.mockImplementation(jestSpyFunction.mockImplementationFactory())

		const mockRestore = (): void => {
			spy.mockRestore()
		}

		return { mockRestore, spy }
	},
}
