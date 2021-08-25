import { ContractFnTerm } from '../types';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyClassFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractFnTerm[];
    protected readonly _mockClassParams: any[];
    constructor({ terms, mockClassParams }: {
        terms: ContractFnTerm[];
        mockClassParams: any[];
    });
    mockImplementationFactory(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-class-function-strategy.d.ts.map