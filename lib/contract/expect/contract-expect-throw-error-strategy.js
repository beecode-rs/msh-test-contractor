"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectThrowErrorStrategy = void 0;
class ContractExpectThrowErrorStrategy {
    constructor({ term }) {
        this._termResult = term.result;
    }
    test(fn) {
        expect(() => fn()).toThrow(this._termResult.message);
    }
}
exports.ContractExpectThrowErrorStrategy = ContractExpectThrowErrorStrategy;
//# sourceMappingURL=contract-expect-throw-error-strategy.js.map