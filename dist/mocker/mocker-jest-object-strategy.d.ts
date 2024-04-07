import { jest } from '@jest/globals';
import { MockerStrategy } from '../mocker/mocker-strategy.js';
import { AnyContract } from '../types/index.js';
export type MockerJestObjectResult = {
    [k: string]: jest.Spied<any>;
};
export declare class MockerJestObjectStrategy implements MockerStrategy<MockerJestObjectResult> {
    protected _contract: AnyContract;
    protected _spies: jest.Spied<any>[];
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockerJestObjectResult;
    protected _mockObject(): MockerJestObjectResult;
}
//# sourceMappingURL=mocker-jest-object-strategy.d.ts.map