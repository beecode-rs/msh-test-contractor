import { ContractTerm } from '../types/index';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyClassFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _mockClassParams: any[];
    constructor({ terms, mockClassParams }: {
        terms: ContractTerm[];
        mockClassParams: any[];
    });
    mockImplementationFactory(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-class-function-strategy.d.ts.map