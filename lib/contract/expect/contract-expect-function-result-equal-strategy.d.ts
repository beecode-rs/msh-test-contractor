import { ContractFnTerm } from '../../types/index';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    protected readonly _termReturnFnParams: any;
    constructor({ term }: {
        term: ContractFnTerm;
    });
    test(fn: () => any): void;
}
//# sourceMappingURL=contract-expect-function-result-equal-strategy.d.ts.map