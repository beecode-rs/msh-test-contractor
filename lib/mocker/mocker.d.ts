/// <reference types="jest" />
import { AnyContract, ContractMockRevertFn, PropType } from '../types/index';
export declare type MockerContractResult = {
    spy: jest.SpyInstance;
    mockRestore: ContractMockRevertFn;
};
export declare const mocker: {
    contract: <C extends AnyContract>(contract: C) => MockerContractResult;
    function: <C_1 extends AnyContract, CFNK extends Extract<keyof PropType<C_1, "fns">, string>>(contract: C_1, fnName: CFNK) => MockerContractResult;
};
//# sourceMappingURL=mocker.d.ts.map