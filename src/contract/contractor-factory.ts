import { Contract, ContractFunctions, PropType } from '../types/index'

export const contractFactory = <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>>(
  module: M,
  subjectName: SN,
  fns: Partial<ContractFunctions<S>>
): Contract<M, SN, S> => ({
  module,
  subjectName,
  fns,
})
