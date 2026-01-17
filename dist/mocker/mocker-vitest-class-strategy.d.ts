import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract, type ContractTerm } from '#src/types/index';
export declare class MockerVitestClassStrategy implements MockerStrategy<vi.Spied<any>> {
    protected _contract: AnyContract;
    protected _spy?: vi.Spied<any>;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): vi.Spied<any>;
    protected _functionNames(classObject: any): string[];
    protected _mockClass(functionNames: string[]): (...args: any[]) => any;
    protected _mockFunction(params: {
        terms: ContractTerm[];
        mockClassParams: any[];
        name: string;
    }): (...args: any[]) => any;
}
//# sourceMappingURL=mocker-vitest-class-strategy.d.ts.map