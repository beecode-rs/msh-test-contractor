import { type AnyContract, type ContractMockRevertFn, type PropType } from '#src/types/index';
export type MockerContractResult<SPY = vi.Spied<any>> = {
    spy: SPY;
    mockRestore: ContractMockRevertFn;
};
export declare const mocker: {
    contract: <SPY = vi.Spied<any>, C extends AnyContract = any>(contract: C) => MockerContractResult<SPY>;
    function: <C extends AnyContract, CFNK extends Extract<keyof PropType<C, "fns">, string>>(contract: C, fnName: CFNK) => MockerContractResult;
};
//# sourceMappingURL=mocker.d.ts.map