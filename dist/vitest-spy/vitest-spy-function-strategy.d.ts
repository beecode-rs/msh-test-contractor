import { type Mock } from 'vitest';
import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy';
import { type ContractTerm } from '#src/types/index';
export declare class VitestSpyFunctionStrategy implements VitestSpyStrategy {
    protected readonly _terms: ContractTerm[];
    protected readonly _name: string;
    constructor(params: {
        terms: ContractTerm[];
        name: string;
    });
    mockImplementationFactory(): Mock;
}
//# sourceMappingURL=vitest-spy-function-strategy.d.ts.map