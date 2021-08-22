import { ContractTerm } from '../types/index';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyClassFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _mockClassParams: any[];
    protected readonly _fnName: string;
    constructor({ terms, fnName, mockClassParams }: {
        terms: ContractTerm[];
        fnName: string;
        mockClassParams: any[];
    });
    mockImplementation(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-class-function-strategy.d.ts.map