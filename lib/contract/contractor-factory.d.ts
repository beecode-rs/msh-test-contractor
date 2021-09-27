/// <reference types="node" />
import { Contract, ContractMock, PropType } from '../types';
export declare const contractFactory: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<Partial<{ [key in Extract<keyof S, string>]: import("../types").ContractFunction; } & {
    CONSTRUCTOR: import("../types").ContractFunction;
    SELF: import("../types").ContractFunction;
} & {
    [k: string]: import("../types").ContractFunction;
}>>>(options: {
    module: M;
    subjectName: SN;
    mock?: ContractMock | undefined;
}, fns: CFNS) => Contract<M, SN, S>;
//# sourceMappingURL=contractor-factory.d.ts.map