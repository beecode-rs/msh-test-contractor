"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractExpectAnyEqualStrategy = void 0;
const object_util_1 = require("../../util/object-util");
class ContractExpectAnyEqualStrategy {
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
    }
    async test(fn) {
        const result = await fn();
        expect(object_util_1.objectUtil.stringifyOrNullUndefined(result)).toEqual(object_util_1.objectUtil.stringifyOrNullUndefined(this._termResult));
    }
}
exports.ContractExpectAnyEqualStrategy = ContractExpectAnyEqualStrategy;
//# sourceMappingURL=contract-expect-any-equal-strategy.js.map