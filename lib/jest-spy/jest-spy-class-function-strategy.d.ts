import { ContractFnTerm } from '../types';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyClassFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractFnTerm[];
    protected readonly _mockClassParams: any[];
    protected readonly _fnName: string;
    constructor({ terms, fnName, mockClassParams }: {
        terms: ContractFnTerm[];
        fnName: string;
        mockClassParams: any[];
    });
    mockImplementation(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-class-function-strategy.d.ts.map