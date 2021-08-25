import { ContractFnTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectFunctionResultEqualStrategy implements ContractExpectStrategy {
    protected readonly _result: any;
    protected readonly _termResult: any;
    protected readonly _termReturnFnParams: any;
    constructor({ result, term }: {
        result: any;
        term: ContractFnTerm;
    });
    test(): void;
}
//# sourceMappingURL=contract-expect-function-result-equal-strategy.d.ts.map