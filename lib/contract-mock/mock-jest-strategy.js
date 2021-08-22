"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockJestStrategy = void 0;
class MockJestStrategy {
    constructor(_jestMock) {
        this._jestMock = _jestMock;
    }
    mock({ params }) {
        this._restoreMockFn = this._jestMock ? this._jestMock(jest, { params }) : [];
    }
    restore() {
        var _a;
        if (this._restoreMockFn)
            (_a = this._restoreMockFn) === null || _a === void 0 ? void 0 : _a.forEach((rf) => rf());
    }
}
exports.MockJestStrategy = MockJestStrategy;
//# sourceMappingURL=mock-jest-strategy.js.map