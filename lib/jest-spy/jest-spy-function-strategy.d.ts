import { type Mock } from 'vitest';
import { type JestSpyStrategy } from '#src/jest-spy/jest-spy-strategy';
import { type ContractTerm } from '#src/types/index';
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