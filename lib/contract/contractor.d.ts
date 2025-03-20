import { type Contract, type PropType } from '#src/types/index';
export declare const contractor: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, C extends Contract<M, SN, S>, CFNK extends Extract<keyof PropType<C, "fns">, string>>(contract: C, fnName: CFNK) => void;
//# sourceMappingURL=contractor.d.ts.map