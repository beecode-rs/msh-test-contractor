/// <reference types="jest" />
import { AnyContract, ContractTerm } from '../types';
import { MockerStrategy } from './mocker-strategy';
export declare class MockerJestClassStrategy implements MockerStrategy<jest.SpyInstance> {
    protected _contract: AnyContract;
    protected _spy?: jest.SpyInstance;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): jest.SpyInstance;
    protected _functionNames(classObject: any): string[];
    protected _mockClass(functionNames: string[]): (...args: any[]) => any;
    protected _mockFunction(params: {
        terms: ContractTerm[];
        mockClassParams: any[];
        name: string;
    }): (...args: any[]) => any;
}
//# sourceMappingURL=mocker-jest-class-strategy.d.ts.map