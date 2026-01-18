import { type MockInstance } from 'vitest';
import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract } from '#src/types/index';
export declare class MockerVitestFunctionStrategy implements MockerStrategy<MockInstance<any>> {
    protected _contract: AnyContract;
    protected _spy?: MockInstance<any>;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockInstance<any>;
}
//# sourceMappingURL=mocker-vitest-function-strategy.d.ts.map