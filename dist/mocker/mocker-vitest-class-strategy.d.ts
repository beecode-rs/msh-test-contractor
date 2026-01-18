import { type MockInstance } from 'vitest';
import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract, type ContractTerm } from '#src/types/index';
export declare class MockerVitestClassStrategy implements MockerStrategy<MockInstance<any>> {
    protected _contract: AnyContract;
    protected _spy?: MockInstance<any>;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockInstance<any>;
    protected _functionNames(classObject: any): string[];
    protected _mockClass(functionNames: string[]): (...args: any[]) => any;
    protected _mockFunction(params: {
        terms: ContractTerm[];
        mockClassParams: any[];
        name: string;
    }): (...args: any[]) => any;
}
//# sourceMappingURL=mocker-vitest-class-strategy.d.ts.map