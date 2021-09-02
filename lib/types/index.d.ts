export declare type PropType<T, P extends keyof T> = T[P];
export declare type Contract<MODULE, SUBJECT_NAME extends Extract<keyof MODULE, string>, SUBJECT extends PropType<MODULE, SUBJECT_NAME>> = {
    module: MODULE;
    subjectName?: SUBJECT_NAME;
    mock?: ContractMock;
    fns: ContractFns<SUBJECT>;
};
export declare type AnyContract = Contract<any, any, any>;
export declare type ContractFns<SUBJECT> = Partial<{
    [key in Extract<keyof SUBJECT, string>]: ContractFunction;
} & {
    CONSTRUCTOR: ContractFunction;
    [k: string]: ContractFunction;
}>;
export declare type ContractFunction = {
    terms: ContractTerm[];
    mock?: ContractMock;
};
export declare type ContractTerm = {
    params: any[];
    result: any;
    constructorParams?: any[];
    returnFnParams?: any[];
};
export declare type ContractMock = {
    jest?: ContractJestMock;
};
export declare type ContractJestMock = (options?: {
    params?: any[];
}) => ContractMockRevertFns;
export declare type ContractMockRevertFn = () => void;
export declare type ContractMockRevertFns = ContractMockRevertFn[];
//# sourceMappingURL=index.d.ts.map