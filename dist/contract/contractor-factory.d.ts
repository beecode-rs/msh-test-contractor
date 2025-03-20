import { type Contract, type ContractFns, type ContractMock, type PropType } from '#src/types/index';
export declare const contractFactory: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends Partial<ContractFns<S>>>(options: {
    module: M;
    subjectName: SN;
    mock?: ContractMock;
}, fns: CFNS) => Contract<M, SN, S>;
//# sourceMappingURL=contractor-factory.d.ts.map