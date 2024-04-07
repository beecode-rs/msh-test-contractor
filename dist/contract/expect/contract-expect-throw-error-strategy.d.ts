import { ContractExpectStrategy } from '../../contract/expect/contract-expect-service.js';
import { ContractTerm } from '../../types/index.js';
export declare class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-throw-error-strategy.d.ts.map