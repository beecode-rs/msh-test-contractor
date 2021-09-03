"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestSpyFunctionStrategy = void 0;
const deep_equal_1 = __importDefault(require("deep-equal"));
class JestSpyFunctionStrategy {
    constructor({ terms }) {
        this._terms = terms;
    }
    mockImplementationFactory() {
        const fakeImplementation = (...mockParams) => {
            const foundTerm = this._terms.find((term) => deep_equal_1.default(term.params, mockParams));
            if (!foundTerm)
                throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`);
            return foundTerm.result;
        };
        return jest.fn().mockImplementation(fakeImplementation);
    }
}
exports.JestSpyFunctionStrategy = JestSpyFunctionStrategy;
//# sourceMappingURL=jest-spy-function-strategy.js.map