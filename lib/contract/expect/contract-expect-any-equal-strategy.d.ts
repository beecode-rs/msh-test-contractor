import { ContractFnTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectAnyEqualStrategy implements ContractExpectStrategy {
    protected readonly _result: any;
    protected readonly _termResult: any;
    constructor({ result, term }: {
        result: any;
        term: ContractFnTerm;
    });
    test(): void;
}
//# sourceMappingURL=contract-expect-any-equal-strategy.d.ts.map