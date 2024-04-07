import { jest } from '@jest/globals';
import { AnyContract, ContractMockRevertFn, PropType } from '../types/index.js';
export type MockerContractResult<SPY = jest.Spied<any>> = {
    spy: SPY;
    mockRestore: ContractMockRevertFn;
};
export declare const mocker: {
    contract: <SPY = import("jest-mock").SpiedClass<any> | import("jest-mock").SpiedFunction<any>, C extends AnyContract = any>(contract: C) => MockerContractResult<SPY>;
    function: <C_1 extends AnyContract, CFNK extends Extract<keyof PropType<C_1, "fns">, string>>(contract: C_1, fnName: CFNK) => MockerContractResult;
};
//# sourceMappingURL=mocker.d.ts.map