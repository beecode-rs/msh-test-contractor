/// <reference types="node" />
import { Contract, ContractMock, PropType } from '../types/index';
export declare const contractFactory: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<Partial<{ [key in Extract<keyof S, string>]: import("../types/index").ContractFunction; } & {
    [k: string]: import("../types/index").ContractFunction;
    CONSTRUCTOR: import("../types/index").ContractFunction;
}>>>(options: {
    module: M;
    subjectName?: SN | undefined;
    mock?: ContractMock | undefined;
}, fns: CFNS) => Contract<M, SN, S>;
//# sourceMappingURL=contractor-factory.d.ts.map
