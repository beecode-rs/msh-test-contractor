import { ContractTerm } from '../../types/index';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor({ term }: {
        term: ContractTerm;
    });
    test(fn: () => any): void;
}
//# sourceMappingURL=contract-expect-any-equal-strategy.d.ts.map