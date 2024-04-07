import { jest } from '@jest/globals';
import { JestSpyStrategy } from '../jest-spy/jest-spy-strategy.js';
import { ContractTerm } from '../types/index.js';
export declare class JestSpyFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _name: string;
    constructor(params: {
        terms: ContractTerm[];
        name: string;
    });
    mockImplementationFactory(): jest.Mock<any>;
}
//# sourceMappingURL=jest-spy-function-strategy.d.ts.map