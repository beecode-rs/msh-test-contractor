"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectFunctionResultEqualStrategy = void 0;
class ContractExpectFunctionResultEqualStrategy {
    constructor({ result, term }) {
        this._result = result;
        this._termResult = term.result;
        this._termReturnFnParams = term.returnFnParams;
    }
    test() {
        expect(this._result(...this._termReturnFnParams)).toEqual(this._termResult);
    }
}
exports.ContractExpectFunctionResultEqualStrategy = ContractExpectFunctionResultEqualStrategy;
//# sourceMappingURL=contract-expect-function-result-equal-strategy.js.map