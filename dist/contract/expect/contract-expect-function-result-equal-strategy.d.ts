import { ContractExpectStrategy } from '../../contract/expect/contract-expect-service.js';
import { ContractTerm } from '../../types/index.js';
export declare class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    protected readonly _termReturnFnParams: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-function-result-equal-strategy.d.ts.map