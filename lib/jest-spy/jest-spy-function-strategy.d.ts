import { ContractFnTerm } from '../types';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractFnTerm[];
    constructor({ terms }: {
        terms: ContractFnTerm[];
    });
    mockImplementation(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-function-strategy.d.ts.map