import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { AnyContract, ContractMockRevertFn, PropType } from '../types/index'
import { fnUtil } from '../util/fn-util'
import { mockerService } from './mocker-service'

export const mocker = {
  contract: <C extends AnyContract>(contract: C): ContractMockRevertFn => {
    const mockerStrategy = mockerService.strategyFromContract(contract)
    mockerStrategy.contractSpy()
    return (): void => {
      mockerStrategy.mockRestore()
    }
  },
  function: <C extends AnyContract, CFNK extends Extract<keyof PropType<C, 'fns'>, string>>(
    contract: C,
    fnName: CFNK
  ): ContractMockRevertFn => {
    const { module, subjectName, fns } = contract

    const spy = fnUtil.isConstructor(fnName) ? jest.spyOn(module, subjectName) : jest.spyOn(module[subjectName], fnName)

    const { terms } = fns[fnName]!
    if (!terms) throw Error(`Terms not found in function ${fnName} for module ${subjectName}`)

    const jestSpyFunction = new JestSpyFunctionStrategy({ terms })
    spy.mockImplementation(jestSpyFunction.mockImplementation())

    return (): void => {
      spy.mockRestore()
    }
  },
}
