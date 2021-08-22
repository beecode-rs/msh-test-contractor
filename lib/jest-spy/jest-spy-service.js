"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jestSpyService = void 0;
const jest_spy_class_function_strategy_1 = require("./jest-spy-class-function-strategy");
const jest_spy_function_strategy_1 = require("./jest-spy-function-strategy");
exports.jestSpyService = {
    strategyFromTerms: ({ terms, fnName, mockClassParams, }) => {
        if (!terms || terms.length === 0)
            throw new Error(`Terms missing from the [${fnName}] function`);
        const { constructorParams } = terms[0];
        if (mockClassParams && constructorParams)
            return new jest_spy_class_function_strategy_1.JestSpyClassFunctionStrategy({ fnName, terms, mockClassParams });
        return new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms });
    },
};
//# sourceMappingURL=jest-spy-service.js.map