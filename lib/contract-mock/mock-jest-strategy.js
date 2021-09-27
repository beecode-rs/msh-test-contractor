"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockJestStrategy = void 0;
class MockJestStrategy {
    constructor(_mock) {
        this._mock = _mock;
    }
    mock({ params } = {}) {
        this._restoreMockFn = this._mock ? this._mock({ params }) : [];
    }
    restore() {
        if (this._restoreMockFn)
            this._restoreMockFn.forEach((rf) => rf());
    }
}
exports.MockJestStrategy = MockJestStrategy;
//# sourceMappingURL=mock-jest-strategy.js.map