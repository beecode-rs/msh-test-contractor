"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestSpyClassFunctionStrategy = void 0;
const deep_equal_1 = __importDefault(require("deep-equal"));
class JestSpyClassFunctionStrategy {
    constructor({ terms, fnName, mockClassParams }) {
        this._terms = terms;
        this._mockClassParams = mockClassParams;
        this._fnName = fnName;
    }
    mockImplementation() {
        return (...mockParams) => {
            const foundTerm = this._terms.find((term) => deep_equal_1.default(term.constructorParams, this._mockClassParams) && deep_equal_1.default(term.params, mockParams));
            if (!foundTerm)
                throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`);
            // TODO what to do if we expect error to be return, should we throw it
            // if (foundTerm instanceof Error) throw foundTerm.result
            return foundTerm.result;
        };
    }
}
exports.JestSpyClassFunctionStrategy = JestSpyClassFunctionStrategy;
//# sourceMappingURL=jest-spy-class-function-strategy.js.map