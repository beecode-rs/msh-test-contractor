import { MockStrategy } from '#src/contract-mock/mock-strategy';
import { ContractMockRevertFns } from '#src/types';
export declare class MockJestStrategy implements MockStrategy {
    protected readonly _mock?: any;
    protected _restoreMockFn?: ContractMockRevertFns;
    constructor(_mock?: any);
    mock(mockParams?: {
        params?: any[];
    }): void;
    restore(): void;
}
//# sourceMappingURL=mock-jest-strategy.d.ts.map