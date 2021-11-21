/// <reference types="jest" />
import { ContractTerm } from '../types';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _name: string;
    constructor(params: {
        terms: ContractTerm[];
        name: string;
    });
    mockImplementationFactory(): jest.Mock;
}
//# sourceMappingURL=jest-spy-function-strategy.d.ts.map