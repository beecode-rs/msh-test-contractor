import { type MockInstance } from 'vitest';
import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract } from '#src/types/index';
export type MockerVitestObjectResult = Record<string, MockInstance<any>>;
export declare class MockerVitestObjectStrategy implements MockerStrategy<MockerVitestObjectResult> {
    protected _contract: AnyContract;
    protected _spies: MockInstance<any>[];
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockerVitestObjectResult;
    protected _mockObject(): MockerVitestObjectResult;
}
//# sourceMappingURL=mocker-vitest-object-strategy.d.ts.map