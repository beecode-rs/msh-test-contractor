import { ContractTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    protected readonly _termReturnFnParams: any;
    constructor({ term }: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-function-result-equal-strategy.d.ts.map