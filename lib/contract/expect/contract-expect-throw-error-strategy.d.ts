import { ContractFnTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor({ term }: {
        term: ContractFnTerm;
    });
    test(fn: () => any): void;
}
//# sourceMappingURL=contract-expect-throw-error-strategy.d.ts.map