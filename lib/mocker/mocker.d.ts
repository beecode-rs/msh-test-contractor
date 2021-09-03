/// <reference types="jest" />
import { AnyContract, ContractMockRevertFn, PropType } from '../types/index';
export declare type MockerContractResult<SPY = jest.SpyInstance> = {
    spy: SPY;
    mockRestore: ContractMockRevertFn;
};
export declare const mocker: {
    contract: <SPY = jest.SpyInstance<any, any>, C extends AnyContract = any>(contract: C) => MockerContractResult<SPY>;
    function: <C_1 extends AnyContract, CFNK extends Extract<keyof PropType<C_1, "fns">, string>>(contract: C_1, fnName: CFNK) => MockerContractResult;
};
//# sourceMappingURL=mocker.d.ts.map