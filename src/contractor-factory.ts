import { Contract, ContractFunctions, PropType } from './types/index'

// @ts-ignore
export const contractFactory = <M, SN extends string, S extends PropType<M, SN>>(
  module: M,
  subjectName: SN,
  fn: Partial<ContractFunctions<S>>
): Contract<M, SN, S> => ({
  module,
  subjectName,
  fn,
})
