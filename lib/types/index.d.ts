export declare type PropType<T, P extends keyof T> = T[P];
export declare type Contract<MODULE, SUBJECT_NAME extends Extract<keyof MODULE, string>, SUBJECT extends PropType<MODULE, SUBJECT_NAME>> = {
    module: MODULE;
    subjectName?: SUBJECT_NAME;
    fns: ContractFns<SUBJECT>;
};
export declare type AnyContract = Contract<any, any, any>;
export declare type ContractFns<SUBJECT> = Partial<{
    [key in Extract<keyof SUBJECT, string>]: ContractFn;
} & {
    _constructor: ContractFn;
    [k: string]: ContractFn;
}>;
export declare type ContractFn = {
    terms: ContractFnTerm[];
    mock?: ContractFnMock;
};
export declare type ContractFnTerm = {
    params: any[];
    result: any;
    constructorParams?: any[];
    returnFnParams?: any[];
};
export declare type ContractFnMock = {
    jest?: ContractJestMock;
};
export declare type ContractJestMock = (jest: any, options: {
    params?: any[];
}) => ContractMockRevertFns;
export declare type ContractMockRevertFn = () => void;
export declare type ContractMockRevertFns = ContractMockRevertFn[];
//# sourceMappingURL=index.d.ts.map