import { ContractJestMock, ContractMockRevertFns } from '../types';
import { MockStrategy } from './mock-strategy';
export declare class MockJestStrategy implements MockStrategy {
    protected readonly _jestMock?: ContractJestMock | undefined;
    protected _restoreMockFn?: ContractMockRevertFns;
    constructor(_jestMock?: ContractJestMock | undefined);
    mock({ params }?: {
        params?: any[];
    }): void;
    restore(): void;
}
//# sourceMappingURL=mock-jest-strategy.d.ts.map