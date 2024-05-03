import { ContractExpectStrategy } from '#src/contract/expect/contract-expect-service';
import { ContractTerm } from '#src/types';
export declare class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-any-equal-strategy.d.ts.map