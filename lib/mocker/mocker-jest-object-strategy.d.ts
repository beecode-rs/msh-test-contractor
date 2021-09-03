/// <reference types="jest" />
import { AnyContract } from '../types/index';
import { MockerStrategy } from './mocker-strategy';
export declare type MockerJestObjectResult = {
    [k: string]: jest.Mock;
};
export declare class MockerJestObjectStrategy implements MockerStrategy<MockerJestObjectResult> {
    protected _contract: AnyContract;
    protected _spies: jest.SpyInstance[];
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockerJestObjectResult;
    protected _mockObject(): MockerJestObjectResult;
}
//# sourceMappingURL=mocker-jest-object-strategy.d.ts.map