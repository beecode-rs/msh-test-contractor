import { Contract, ContractFunction, ContractMockRevertFn, PropType } from './types/index'
import deepEqual from 'deep-equal'

export const mocker = <C extends Contract<any, any, any>, CFNK extends Extract<keyof PropType<C, 'fn'>, string>>(
  { subjectName, module, fn }: C,
  fnName: CFNK
): ContractMockRevertFn => {
  const { terms } = fn[fnName] as ContractFunction
  const spy = fnName === '_constructor' ? jest.spyOn(module, subjectName) : jest.spyOn(module[subjectName], fnName)

  spy.mockImplementation((...params: any[]) => {
    const foundTerm = terms.find((term) => deepEqual(term.params, params))
    if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(params)}`)
    return foundTerm.result
  })

  return (): void => {
    spy.mockRestore()
  }
}
