import { jest } from '@jest/globals';
import { MockerStrategy } from '../mocker/mocker-strategy.js';
import { AnyContract } from '../types/index.js';
export declare class MockerJestFunctionStrategy implements MockerStrategy<jest.SpiedFunction<any>> {
    protected _contract: AnyContract;
    protected _spy?: jest.SpiedFunction<any>;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): jest.SpiedFunction<any>;
}
//# sourceMappingURL=mocker-jest-function-strategy.d.ts.map