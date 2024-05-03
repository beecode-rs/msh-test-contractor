import { Mock } from 'vitest';
import { JestSpyStrategy } from '#src/jest-spy/jest-spy-strategy';
import { ContractTerm } from '#src/types';
export declare class JestSpyFunctionStrategy implements JestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _name: string;
    constructor(params: {
        terms: ContractTerm[];
        name: string;
    });
    mockImplementationFactory(): Mock;
}
//# sourceMappingURL=jest-spy-function-strategy.d.ts.map