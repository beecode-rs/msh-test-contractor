import { Contract, ContractFns, PropType } from '../types';
declare type IOverload = {
    <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<ContractFns<S>>>(module: M, fns: CFNS): Contract<M, SN, S>;
    <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<ContractFns<S>>>(module: M, subjectName: SN, fns: CFNS): Contract<M, SN, S>;
};
export declare const contractFactory: IOverload;
export {};
//# sourceMappingURL=contractor-factory.d.ts.map