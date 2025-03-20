import { type MockerStrategy } from '#src/mocker/mocker-strategy';
import { type AnyContract } from '#src/types/index';
export declare class MockerJestFunctionStrategy implements MockerStrategy<vi.SpiedFunction<any>> {
    protected _contract: AnyContract;
    protected _spy?: vi.SpiedFunction<any>;
    constructor(_contract: AnyContract);
    mockRestore(): void;
    contractSpy(): vi.SpiedFunction<any>;
}
//# sourceMappingURL=mocker-jest-function-strategy.d.ts.map