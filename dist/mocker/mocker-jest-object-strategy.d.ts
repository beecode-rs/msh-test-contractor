import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract } from '#src/types/index';
export type MockerJestObjectResult = Record<string, vi.Spied<any>>;
export declare class MockerJestObjectStrategy implements MockerStrategy<MockerJestObjectResult> {
    protected _contract: AnyContract;
    protected _spies: vi.Spied<any>[];
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): MockerJestObjectResult;
    protected _mockObject(): MockerJestObjectResult;
}
//# sourceMappingURL=mocker-jest-object-strategy.d.ts.map