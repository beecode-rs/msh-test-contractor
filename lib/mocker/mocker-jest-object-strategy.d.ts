/// <reference types="jest" />
import { AnyContract } from '../types';
import { MockerStrategy } from './mocker-strategy';
export declare class MockerJestObjectStrategy implements MockerStrategy<{
    [k: string]: (...args: any[]) => any;
}> {
    protected _contract: AnyContract;
    protected _spies: jest.SpyInstance[];
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): {
        [k: string]: (...args: any[]) => any;
    };
    protected _mockObject(): {
        [k: string]: (...args: any[]) => any;
    };
}
//# sourceMappingURL=mocker-jest-object-strategy.d.ts.map