import { JestSpyStrategy } from '../jest-spy/jest-spy-strategy.js';
import { ContractTerm } from '../types/index.js';
export declare class JestSpyClassFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _mockClassParams: any[];
    protected readonly _name: string;
    constructor(params: {
        terms: ContractTerm[];
        mockClassParams: any[];
        name: string;
    });
    mockImplementationFactory(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-class-function-strategy.d.ts.map