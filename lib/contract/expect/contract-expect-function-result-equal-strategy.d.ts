import { ContractExpectStrategy } from '#src/contract/expect/contract-expect-service';
import { ContractTerm } from '#src/types';
export declare class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    protected readonly _termReturnFnParams: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-function-result-equal-strategy.d.ts.map