/// <reference types="jest" />
import { ContractTerm } from '../types/index';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    constructor({ terms }: {
        terms: ContractTerm[];
    });
    mockImplementationFactory(): jest.Mock;
}
//# sourceMappingURL=jest-spy-function-strategy.d.ts.map