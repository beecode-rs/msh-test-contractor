import { Contract, ContractMockRevertFn } from './contract-type/contract'
import deepEqual from 'deep-equal'

export const mocker = (contract: Contract, fn: string): ContractMockRevertFn => {
  const { terms } = contract.fn[fn]
  const spy = fn === '_constructor' ? jest.spyOn(contract.module, contract.name) : jest.spyOn(contract.module[contract.name], fn)

  spy.mockImplementation((...params: any[]) => {
    const foundTerm = terms.find((term) => deepEqual(term.params, params))
    if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(params)}`)
    return foundTerm.result
  })

  return (): void => {
    spy.mockRestore()
  }
}
