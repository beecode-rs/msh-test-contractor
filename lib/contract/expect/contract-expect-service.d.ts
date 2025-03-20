import { type ContractTerm } from '#src/types/index';
export interface ContractExpectStrategy {
    test(fn: () => any): Promise<void>;
}
export declare const contractExpectService: {
    fromTerm: (params: {
        term: ContractTerm;
    }) => ContractExpectStrategy;
};
//# sourceMappingURL=contract-expect-service.d.ts.map