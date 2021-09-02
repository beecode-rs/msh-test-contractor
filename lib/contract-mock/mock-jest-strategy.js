"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockJestStrategy = void 0;
class MockJestStrategy {
    constructor(_jestMock) {
        this._jestMock = _jestMock;
    }
    mock({ params } = {}) {
        this._restoreMockFn = this._jestMock ? this._jestMock({ params }) : [];
    }
    restore() {
        if (this._restoreMockFn)
            this._restoreMockFn.forEach((rf) => rf());
    }
}
exports.MockJestStrategy = MockJestStrategy;
//# sourceMappingURL=mock-jest-strategy.js.map