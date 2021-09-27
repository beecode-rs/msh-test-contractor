import { ContractTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-strategy';
export declare class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor({ term }: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-throw-error-strategy.d.ts.map