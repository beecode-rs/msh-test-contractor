import { ContractMockJest, ContractMockRevertFns } from '../types';
import { MockStrategy } from './mock-strategy';
export declare class MockJestStrategy implements MockStrategy {
    protected readonly _jestMock?: ContractMockJest | undefined;
    protected _restoreMockFn?: ContractMockRevertFns;
    constructor(_jestMock?: ContractMockJest | undefined);
    mock({ params }: {
        params?: any[];
    }): void;
    restore(): void;
}
//# sourceMappingURL=mock-jest-strategy.d.ts.map