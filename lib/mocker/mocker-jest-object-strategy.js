"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockerJestObjectStrategy = void 0;
const jest_spy_function_strategy_1 = require("../jest-spy/jest-spy-function-strategy");
class MockerJestObjectStrategy {
    constructor(_contract) {
        this._contract = _contract;
        this._spies = [];
    }
    mockRestore() {
        this._spies.forEach((spy) => spy.mockRestore());
    }
    contractSpy() {
        return this._mockObject();
    }
    _mockObject() {
        const { fns } = this._contract;
        return Object.fromEntries(Object.entries(fns).map(([fnName, ctFunc]) => {
            const jestSpyFunction = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms: ctFunc.terms });
            return [fnName, jestSpyFunction.mockImplementation()];
        }));
    }
}
exports.MockerJestObjectStrategy = MockerJestObjectStrategy;
//# sourceMappingURL=mocker-jest-object-strategy.js.map