import { jestSpyService } from './mock/jest-spy/jest-spy-service'
import { AnyContract, ContractFunction, ContractMockRevertFn, PropType } from './types'
import deepEqual from 'deep-equal'

export const mocker = <C extends AnyContract>(contract: C): ContractMockRevertFn => {
  const { subjectName, module, fn } = contract
  // const { terms } = fn[fnName]!
  // if (!terms) throw Error(`Terms not found in function ${fnName} for module ${subjectName}`)

  // const mockStrategy = jestSpyService.strategyFromContract({ contract, fnName })
  // const spy = mockStrategy.spyOn(terms)

  const spy = jest.spyOn(module, subjectName).mockImplementation((...mockClassParams: any[]): any => {
    const test = Object.entries(fn).map(([fnName, fnContract]: [string, ContractFunction]) => {
      const jestSpyStrategy = jestSpyService.strategyFromContract()
    })

    return {
      [fnName]: (...mockFnParams: any[]): any => {
        const foundTerm = terms.find(
          (term) => deepEqual(term.constructorParams, mockClassParams) && deepEqual(term.params, mockFnParams)
        )
        if (!foundTerm) throw Error(`Unknown contract for params ${JSON.stringify(mockFnParams)}`)

        if (foundTerm instanceof Error) throw foundTerm.result
        return foundTerm.result
      },
    }
  })

  return (): void => {
    spy.mockRestore()
  }
}
