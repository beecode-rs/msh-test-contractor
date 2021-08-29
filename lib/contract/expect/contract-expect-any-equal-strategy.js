"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectAnyEqualStrategy = void 0;
class ContractExpectAnyEqualStrategy {
    constructor({ term }) {
        this._termResult = term.result;
    }
    test(fn) {
        expect(fn()).toEqual(this._termResult);
    }
}
exports.ContractExpectAnyEqualStrategy = ContractExpectAnyEqualStrategy;
//# sourceMappingURL=contract-expect-any-equal-strategy.js.map