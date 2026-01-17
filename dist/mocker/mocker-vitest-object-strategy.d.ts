import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract } from '#src/types/index';
export type MockerVitestObjectResult = Record<string, vi.Spied<any>>;
export declare class MockerVitestObjectStrategy implements MockerStrategy<MockerVitestObjectResult> {
    protected _contract: AnyContract;
    protected _spies: vi.Spied<any>[];
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockerVitestObjectResult;
    protected _mockObject(): MockerVitestObjectResult;
}
//# sourceMappingURL=mocker-vitest-object-strategy.d.ts.map