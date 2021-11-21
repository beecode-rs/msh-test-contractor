"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractExpectService = void 0;
const contract_expect_any_equal_strategy_1 = require("./contract-expect-any-equal-strategy");
const contract_expect_function_result_equal_strategy_1 = require("./contract-expect-function-result-equal-strategy");
const contract_expect_throw_error_strategy_1 = require("./contract-expect-throw-error-strategy");
exports.contractExpectService = {
    fromTerm: (params) => {
        const { term } = params;
        if (term.result instanceof Error)
            return new contract_expect_throw_error_strategy_1.ContractExpectThrowErrorStrategy({ term });
        if (term.returnFnParams)
            return new contract_expect_function_result_equal_strategy_1.ContractExpectFunctionResultEqualStrategy({ term });
        return new contract_expect_any_equal_strategy_1.ContractExpectAnyEqualStrategy({ term });
    },
};
//# sourceMappingURL=contract-expect-service.js.map