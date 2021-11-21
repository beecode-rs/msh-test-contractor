"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectThrowErrorStrategy = void 0;
class ContractExpectThrowErrorStrategy {
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
    }
    async test(fn) {
        expect(() => fn()).toThrow(this._termResult.message);
    }
}
exports.ContractExpectThrowErrorStrategy = ContractExpectThrowErrorStrategy;
//# sourceMappingURL=contract-expect-throw-error-strategy.js.map