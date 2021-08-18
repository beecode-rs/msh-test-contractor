import { jestSpyService } from './mock/jest-spy/jest-spy-service'
import { AnyContract, ContractMockRevertFn, PropType } from './types'

export const mocker = <C extends AnyContract, CFNK extends Extract<keyof PropType<C, 'fn'>, string>>(
  contract: C,
  fnName: CFNK
): ContractMockRevertFn => {
  const { subjectName, fn } = contract
  const { terms } = fn[fnName]!
  if (!terms) throw Error(`Terms not found in function ${fnName} for module ${subjectName}`)

  const mockStrategy = jestSpyService.strategyFromContract({ contract, fnName })
  const spy = mockStrategy.spyOn(terms)

  return (): void => {
    spy.mockRestore()
  }
}
