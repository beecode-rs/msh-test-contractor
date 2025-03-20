import { type MockStrategy } from '#src/contract-mock/mock-strategy';
import { type ContractMock, type ContractMockRevertFns } from '#src/types/index';
export declare class MockJestStrategy implements MockStrategy {
    protected readonly _mock?: ContractMock | undefined;
    protected _restoreMockFn?: ContractMockRevertFns;
    constructor(_mock?: ContractMock | undefined);
    mock(mockParams?: {
        params?: any[];
    }): void;
    restore(): void;
}
//# sourceMappingURL=mock-jest-strategy.d.ts.map