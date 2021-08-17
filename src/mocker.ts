import { AnyContract, ContractMockRevertFn, PropType } from './types'
import { fnUtil } from './util/fn-util'
import deepEqual from 'deep-equal'

export const mocker = <C extends AnyContract, CFNK extends Extract<keyof PropType<C, 'fn'>, string>>(
  { subjectName, module, fn }: C,
  fnName: CFNK
): ContractMockRevertFn => {
  const { terms } = fn[fnName]!
  if (!terms) throw Error(`Terms not found in function ${fnName} for module ${subjectName}`)

  const spy = fnUtil.isConstructor(fnName) ? jest.spyOn(module, subjectName) : jest.spyOn(module[subjectName], fnName)

  spy.mockImplementation((...mockParams: any[]) => {
    const foundTerm = terms.find((term) => deepEqual(term.params, mockParams))
    if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`)

    if (foundTerm instanceof Error) throw foundTerm.result
    return foundTerm.result
  })

  return (): void => {
    spy.mockRestore()
  }
}
