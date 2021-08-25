"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractExpectService = void 0;
const contract_expect_any_equal_strategy_1 = require("./contract-expect-any-equal-strategy");
const contract_expect_function_result_equal_strategy_1 = require("./contract-expect-function-result-equal-strategy");
exports.contractExpectService = {
    fromTerm: ({ result, term }) => {
        if (term.returnFnParams)
            return new contract_expect_function_result_equal_strategy_1.ContractExpectFunctionResultEqualStrategy({ result, term });
        return new contract_expect_any_equal_strategy_1.ContractExpectAnyEqualStrategy({ result, term });
    },
};
//# sourceMappingURL=contract-expect-service.js.map