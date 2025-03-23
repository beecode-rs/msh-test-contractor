import { type SpecialFnName } from '#src/enum/special-fn-name';
export type PropType<T, P extends keyof T> = T[P];
export type Contract<MODULE, SUBJECT_NAME extends Extract<keyof MODULE, string>, SUBJECT extends PropType<MODULE, SUBJECT_NAME>> = {
    module: MODULE;
    subjectName: SUBJECT_NAME;
    mock?: ContractMock;
    fns: ContractFns<SUBJECT>;
};
export type AnyContract = Contract<any, any, any>;
export type ContractFns<SUBJECT> = Partial<Record<Extract<keyof SUBJECT, string>, ContractFunction> & Record<SpecialFnName, ContractFunction> & Record<string, ContractFunction>>;
export type ContractFunction = {
    terms: ContractTerm[];
    mock?: ContractMock;
};
export type ContractTerm = {
    params: any[];
    result: any;
    constructorParams?: any[];
    returnFnParams?: any[];
};
export type ContractMock = (options?: {
    params?: any[];
}) => ContractMockRevertFns;
export type ContractMockRevertFn = () => void;
export type ContractMockRevertFns = ContractMockRevertFn[];
//# sourceMappingURL=index.d.ts.map