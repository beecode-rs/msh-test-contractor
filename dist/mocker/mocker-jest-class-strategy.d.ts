import { jest } from '@jest/globals';
import { MockerStrategy } from '../mocker/mocker-strategy.js';
import { AnyContract, ContractTerm } from '../types/index.js';
export declare class MockerJestClassStrategy implements MockerStrategy<jest.Spied<any>> {
    protected _contract: AnyContract;
    protected _spy?: jest.Spied<any>;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): jest.Spied<any>;
    protected _functionNames(classObject: any): string[];
    protected _mockClass(functionNames: string[]): (...args: any[]) => any;
    protected _mockFunction(params: {
        terms: ContractTerm[];
        mockClassParams: any[];
        name: string;
    }): (...args: any[]) => any;
}
//# sourceMappingURL=mocker-jest-class-strategy.d.ts.map