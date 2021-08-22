import { Contract, ContractFns, PropType } from '../types';
export declare const contractFactory: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<ContractFns<S>>>(module: M, subjectName: SN, fns: CFNS) => Contract<M, SN, S>;
//# sourceMappingURL=contractor-factory.d.ts.map