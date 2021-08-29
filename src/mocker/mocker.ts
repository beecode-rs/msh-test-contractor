import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy'
import { AnyContract, ContractFn, ContractMockRevertFn, PropType } from '../types'
import { fnUtil } from '../util/fn-util'
import { mockerService } from './mocker-service'

export const mocker = {
  contract: <C extends AnyContract>(contract: C): ContractMockRevertFn => {
    const mockerStrategy = mockerService.strategyFromContract(contract)
    mockerStrategy.contractSpy()
    // TODO check if we can return the jest spy object so we can use it in unit tests
    return (): void => {
      mockerStrategy.mockRestore()
    }
  },
  function: <C extends AnyContract, CFNK extends Extract<keyof PropType<C, 'fns'>, string>>(
    contract: C,
    fnName: CFNK
  ): ContractMockRevertFn => {
    const { module, subjectName, fns } = contract
    const { terms } = fns[fnName]! as ContractFn

    const spy = fnUtil.isConstructor(fnName)
      ? jest.spyOn(module, subjectName)
      : terms[0].constructorParams // if function belongs to class mock prototype
      ? jest.spyOn(module[subjectName].prototype, fnName)
      : jest.spyOn(module[subjectName], fnName)

    if (!terms) throw Error(`Terms not found in function ${fnName} for module ${subjectName}`)

    const jestSpyFunction = new JestSpyFunctionStrategy({ terms })
    spy.mockImplementation(jestSpyFunction.mockImplementationFactory())

    return (): void => {
      spy.mockRestore()
    }
  },
}
