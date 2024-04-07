import { ContractExpectStrategy } from '../../contract/expect/contract-expect-service.js';
import { ContractTerm } from '../../types/index.js';
export declare class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-any-equal-strategy.d.ts.map