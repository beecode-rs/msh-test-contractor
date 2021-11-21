"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectFunctionResultEqualStrategy = void 0;
class ContractExpectFunctionResultEqualStrategy {
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
        this._termReturnFnParams = term.returnFnParams;
    }
    async test(fn) {
        const result = fn()(...this._termReturnFnParams);
        expect(await result).toEqual(this._termResult);
    }
}
exports.ContractExpectFunctionResultEqualStrategy = ContractExpectFunctionResultEqualStrategy;
//# sourceMappingURL=contract-expect-function-result-equal-strategy.js.map