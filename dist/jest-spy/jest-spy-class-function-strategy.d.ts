import { type JestSpyStrategy } from '#src/jest-spy/jest-spy-strategy';
import { type ContractTerm } from '#src/types/index';
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