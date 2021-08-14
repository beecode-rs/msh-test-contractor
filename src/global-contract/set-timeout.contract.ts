import { ContractFunction } from '../contract-type/contract'

export default {
  // subject: {
  //   fn: 'setTimeout',
  //   source: global,
  // },
  // mock: {
  //   jest: (jest: any, _inputParams?: any[]): (() => void) => {
  //     jest.useFakeTimers()
  //
  //     return (): void => {
  //       jest.useRealTimers()
  //     }
  //   },
  // },
  // terms: [
  //   {
  //     params: [jest.fn(), 1000],
  //     // TODO check if we can have contract with void functions
  //   },
  // ],
} as ContractFunction
