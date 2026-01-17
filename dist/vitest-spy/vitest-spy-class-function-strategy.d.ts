import { type VitestSpyStrategy } from '#src/vitest-spy/vitest-spy-strategy';
import { type ContractTerm } from '#src/types/index';
export declare class VitestSpyClassFunctionStrategy implements VitestSpyStrategy {
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
//# sourceMappingURL=vitest-spy-class-function-strategy.d.ts.map