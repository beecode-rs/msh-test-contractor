import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { AnyContract, ContractFunction, ContractMockRevertFn, PropType } from '../types/index'
import { fnUtil } from '../util/fn-util'
import { mockerService } from './mocker-service'

export type MockerContractResult<SPY = jest.SpyInstance> = {
  spy: SPY
  mockRestore: ContractMockRevertFn
}

export const mocker = {
  contract: <SPY = jest.SpyInstance, C extends AnyContract = any>(contract: C): MockerContractResult<SPY> => {
    const mockerStrategy = mockerService.strategyFromContract(contract)
    const spy = mockerStrategy.contractSpy()
    const mockRestore = (): void => mockerStrategy.mockRestore()
    return { mockRestore, spy }
  },
  function: <C extends AnyContract, CFNK extends Extract<keyof PropType<C, 'fns'>, string>>(
    contract: C,
    fnName: CFNK
  ): MockerContractResult => {
    const { module, subjectName, fns } = contract
    const { terms } = fns[fnName]! as ContractFunction

    const spy = fnUtil.isConstructor(fnName)
      ? jest.spyOn(module, subjectName)
      : terms[0].constructorParams // if function belongs to class mock prototype
      ? jest.spyOn(module[subjectName].prototype, fnName)
      : jest.spyOn(module[subjectName], fnName)

    if (!terms) throw Error(`Terms not found in function ${fnName} for module ${subjectName}`)

    const jestSpyFunction = new JestSpyFunctionStrategy({ terms })
    spy.mockImplementation(jestSpyFunction.mockImplementationFactory())

    const mockRestore = (): void => spy.mockRestore()
    return { mockRestore, spy }
  },
}
