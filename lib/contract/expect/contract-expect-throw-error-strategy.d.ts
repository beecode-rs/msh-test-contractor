import { ContractExpectStrategy } from '#src/contract/expect/contract-expect-service';
import { ContractTerm } from '#src/types';
export declare class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-throw-error-strategy.d.ts.map