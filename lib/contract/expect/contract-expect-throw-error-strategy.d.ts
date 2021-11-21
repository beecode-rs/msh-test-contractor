import { ContractTerm } from '../../types';
import { ContractExpectStrategy } from './contract-expect-service';
export declare class ContractExpectThrowErrorStrategy implements ContractExpectStrategy {
    protected readonly _termResult: any;
    constructor(params: {
        term: ContractTerm;
    });
    test(fn: () => any): Promise<void>;
}
//# sourceMappingURL=contract-expect-throw-error-strategy.d.ts.map