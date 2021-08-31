import { Contract, ContractFns, PropType } from '../types/index'

type IOverload = {
  <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<ContractFns<S>>>(
    module: M,
    fns: CFNS
  ): Contract<M, SN, S>
  <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<ContractFns<S>>>(
    module: M,
    subjectName: SN,
    fns: CFNS
  ): Contract<M, SN, S>
}

export const contractFactory: IOverload = <
  M,
  SN extends Extract<keyof M, string>,
  S extends PropType<M, SN>,
  CFNS extends Partial<ContractFns<S>>
>(
  module: M,
  subjectNameOrFns: SN | CFNS,
  fns?: CFNS
): Contract<M, SN, S> => ({
  module,
  ...(fns
    ? {
        subjectName: subjectNameOrFns as SN,
        fns: fns as CFNS,
      }
    : { fns: subjectNameOrFns as CFNS }),
})
