/// <reference types="jest" />
import { AnyContract } from '../types/index';
import { MockerStrategy } from './mocker-strategy';
export declare class MockerJestFunctionStrategy implements MockerStrategy<jest.SpyInstance> {
    protected _contract: AnyContract;
    protected _spy?: jest.SpyInstance;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): jest.SpyInstance;
}
//# sourceMappingURL=mocker-jest-function-strategy.d.ts.map