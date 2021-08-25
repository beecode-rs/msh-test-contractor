"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestSpyClassFunctionStrategy = void 0;
const jest_spy_function_strategy_1 = require("./jest-spy-function-strategy");
const deep_equal_1 = __importDefault(require("deep-equal"));
class JestSpyClassFunctionStrategy {
    constructor({ terms, mockClassParams }) {
        this._terms = terms;
        this._mockClassParams = mockClassParams;
    }
    mockImplementationFactory() {
        return (...mockParams) => {
            const termByConstructorParams = this._terms.filter((term) => deep_equal_1.default(term.constructorParams, this._mockClassParams));
            const jestSpy = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms: termByConstructorParams });
            return jestSpy.mockImplementationFactory()(...mockParams);
        };
    }
}
exports.JestSpyClassFunctionStrategy = JestSpyClassFunctionStrategy;
//# sourceMappingURL=jest-spy-class-function-strategy.js.map