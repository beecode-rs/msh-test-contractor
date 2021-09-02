import { ContractTerm } from '../../types/index';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor({ term }: {
        term: ContractTerm;
    });
    test(fn: () => any): void;
}
//# sourceMappingURL=contract-expect-throw-error-strategy.d.ts.map