import { Contract, ContractMockRevertFn } from './contract-type/contract'
import deepEqual from 'deep-equal'

export const mocker = (contract: Contract): ContractMockRevertFn => {
  const { terms, subject } = contract
  const spy = jest.spyOn(subject.source, subject.fn).mockImplementation((...params: any[]) => {
    const foundTerm = terms.find((term) => deepEqual(term.params, params))
    if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(params)}`)
    return foundTerm.result
  })
  return (): void => {
    spy.mockRestore()
  }
}
