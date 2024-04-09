import { Contract, ContractMock, PropType } from '../types/index.js';
export declare const contractFactory: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<Partial<{ [key in Extract<keyof S, string>]: import("../types/index.js").ContractFunction; } & {
    CONSTRUCTOR: import("../types/index.js").ContractFunction;
    SELF: import("../types/index.js").ContractFunction;
} & {
    [k: string]: import("../types/index.js").ContractFunction;
}>>>(options: {
    module: M;
    subjectName: SN;
    mock?: ContractMock;
}, fns: CFNS) => Contract<M, SN, S>;
//# sourceMappingURL=contractor-factory.d.ts.map