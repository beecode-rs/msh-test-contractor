import { Contract, ContractFunctions, PropType } from './types'

export const contractFactory = <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>>(
  module: M,
  subjectName: SN,
  fn: Partial<ContractFunctions<S>>
): Contract<M, SN, S> => ({
  module,
  subjectName,
  fn,
})
