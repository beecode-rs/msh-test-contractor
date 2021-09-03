/// <reference types="jest" />
import { AnyContract, ContractTerm } from '../types/index';
import { MockerStrategy } from './mocker-strategy';
export declare class MockerJestClassStrategy implements MockerStrategy<jest.SpyInstance> {
    protected _contract: AnyContract;
    protected _spy?: jest.SpyInstance;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): jest.SpyInstance;
    protected _mockClass(): (...args: any[]) => any;
    protected _mockFunction({ terms, mockClassParams, }: {
        terms: ContractTerm[];
        mockClassParams: any[];
    }): (...args: any[]) => any;
}
//# sourceMappingURL=mocker-jest-class-strategy.d.ts.map