"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestSpyClassFunctionStrategy = void 0;
const jest_spy_function_strategy_1 = require("./jest-spy-function-strategy");
const deep_equal_1 = __importDefault(require("deep-equal"));
class JestSpyClassFunctionStrategy {
    constructor(params) {
        const { terms, mockClassParams, name } = params;
        this._terms = terms;
        this._mockClassParams = mockClassParams;
        this._name = name;
    }
    mockImplementationFactory() {
        return (...mockParams) => {
            const termByConstructorParams = this._terms.filter((term) => (0, deep_equal_1.default)(term.constructorParams, this._mockClassParams));
            const jestSpy = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms: termByConstructorParams, name: this._name });
            return jestSpy.mockImplementationFactory()(...mockParams);
        };
    }
}
exports.JestSpyClassFunctionStrategy = JestSpyClassFunctionStrategy;
//# sourceMappingURL=jest-spy-class-function-strategy.js.map