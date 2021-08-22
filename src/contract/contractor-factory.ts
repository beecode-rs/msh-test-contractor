import { Contract, ContractFns, PropType } from '../types'

export const contractFactory = <
  M,
  SN extends Extract<keyof M, string>,
  S extends PropType<M, SN>,
  CFNS extends Partial<ContractFns<S>>
>(
  module: M,
  subjectName: SN,
  fns: CFNS
): Contract<M, SN, S> => ({
  module,
  subjectName,
  fns,
})
