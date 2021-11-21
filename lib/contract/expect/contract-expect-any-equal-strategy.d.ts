import { ContractTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-service';
export declare class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-any-equal-strategy.d.ts.map