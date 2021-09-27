"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockerJestFunctionStrategy = void 0;
class MockerJestFunctionStrategy {
    constructor(_contract) {
        this._contract = _contract;
    }
    mockRestore() {
        if (this._spy)
            this._spy.mockRestore();
    }
    contractSpy() {
        const { module, subjectName } = this._contract;
        this._spy = jest.spyOn(module, subjectName);
        return this._spy;
    }
}
exports.MockerJestFunctionStrategy = MockerJestFunctionStrategy;
//# sourceMappingURL=mocker-jest-function-strategy.js.map