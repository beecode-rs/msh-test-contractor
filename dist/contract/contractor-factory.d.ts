import { ContractMock } from '#src/types';
export declare const contractFactory: <M, SN extends Extract<keyof M, string>, S extends PropType<M, SN>, CFNS extends ContractFns<S>>(options: {
    module: M;
    subjectName: SN;
    mock?: ContractMock;
}, fns: CFNS) => Contract<M, SN, S>;
//# sourceMappingURL=contractor-factory.d.ts.map