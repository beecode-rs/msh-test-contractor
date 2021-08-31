import { AnyContract, ContractMockRevertFn, PropType } from '../types/index';
export declare const mocker: {
    contract: <C extends AnyContract>(contract: C) => ContractMockRevertFn;
    function: <C_1 extends AnyContract, CFNK extends Extract<keyof PropType<C_1, "fns">, string>>(contract: C_1, fnName: CFNK) => ContractMockRevertFn;
};
//# sourceMappingURL=mocker.d.ts.map