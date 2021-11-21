"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestSpyFunctionStrategy = void 0;
const object_util_1 = require("../util/object-util");
class JestSpyFunctionStrategy {
    constructor(params) {
        const { terms, name } = params;
        this._terms = terms;
        this._name = name;
    }
    mockImplementationFactory() {
        const fakeImplementation = (...mockParams) => {
            const foundTerm = this._terms.find((term) => object_util_1.objectUtil.stringifyOrNullUndefined(term.params) === object_util_1.objectUtil.stringifyOrNullUndefined(mockParams));
            if (!foundTerm)
                throw new Error(`Unknown contract ${this._name} for params ${JSON.stringify(mockParams)}`);
            return foundTerm.result;
        };
        return jest.fn().mockImplementation(fakeImplementation);
    }
}
exports.JestSpyFunctionStrategy = JestSpyFunctionStrategy;
//# sourceMappingURL=jest-spy-function-strategy.js.map