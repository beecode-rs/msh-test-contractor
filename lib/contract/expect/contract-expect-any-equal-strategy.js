"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectAnyEqualStrategy = void 0;
class ContractExpectAnyEqualStrategy {
    constructor({ result, term }) {
        this._result = result;
        this._termResult = term.result;
    }
    test() {
        expect(this._result).toEqual(this._termResult);
    }
}
exports.ContractExpectAnyEqualStrategy = ContractExpectAnyEqualStrategy;
//# sourceMappingURL=contract-expect-any-equal-strategy.js.map