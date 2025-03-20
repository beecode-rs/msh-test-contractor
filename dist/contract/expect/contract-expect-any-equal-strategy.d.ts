import { type ContractExpectStrategy } from '#src/contract/expect/contract-expect-service';
import { type ContractTerm } from '#src/types/index';
export declare class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-any-equal-strategy.d.ts.map