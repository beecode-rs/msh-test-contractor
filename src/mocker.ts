import { Contract, ContractFunction, ContractMockRevertFn, PropType } from './types/index'
import deepEqual from 'deep-equal'

export const mocker = <
  M,
  SN extends string,
  // @ts-ignore
  S extends PropType<M, SN>,
  C extends Contract<M, SN, S>,
  CFNK extends keyof PropType<C, 'fn'>
>(
  { subjectName, module, fn }: C,
  fnName: CFNK
): ContractMockRevertFn => {
  // @ts-ignore
  const { terms } = fn[fnName] as ContractFunction
  const spy =
    // @ts-ignore
    fnName.toString() === '_constructor' ? jest.spyOn(module, subjectName) : jest.spyOn(module[subjectName], fnName.toString())

  spy.mockImplementation((...params: any[]) => {
    const foundTerm = terms.find((term) => deepEqual(term.params, params))
    if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(params)}`)
    return foundTerm.result
  })

  return (): void => {
    spy.mockRestore()
  }
}
