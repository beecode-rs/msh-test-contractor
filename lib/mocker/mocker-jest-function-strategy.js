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
        this._spy = jest.spyOn(this._contract.module, this._contract.subjectName);
        return this._spy;
    }
}
exports.MockerJestFunctionStrategy = MockerJestFunctionStrategy;
//# sourceMappingURL=mocker-jest-function-strategy.js.map