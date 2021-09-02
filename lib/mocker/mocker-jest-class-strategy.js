"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockerJestClassStrategy = void 0;
const special_fn_name_1 = require("../enum/special-fn-name");
const jest_spy_function_strategy_1 = require("../jest-spy/jest-spy-function-strategy");
const jest_spy_service_1 = require("../jest-spy/jest-spy-service");
class MockerJestClassStrategy {
    constructor(_contract) {
        this._contract = _contract;
    }
    mockRestore() {
        if (this._spy)
            this._spy.mockRestore();
    }
    contractSpy() {
        const { module, subjectName } = this._contract;
        this._spy = jest.spyOn(module, subjectName);
        this._spy.mockImplementation(this._mockClass());
        return this._spy;
    }
    _mockClass() {
        const { fns } = this._contract;
        return (...mockParams) => {
            const { CONSTRUCTOR: constructorFns } = fns, restFns = __rest(fns, ["CONSTRUCTOR"]);
            const objectWithMockedFunctions = Object.fromEntries(Object.entries(restFns).map(([fnName, ctFunc]) => [
                fnName,
                this._mockFunction({ terms: ctFunc.terms, mockClassParams: mockParams }),
            ]));
            const jestSpy = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms: fns[special_fn_name_1.SpecialFnName.CONSTRUCTOR].terms });
            const result = jestSpy.mockImplementationFactory()(...mockParams);
            return Object.assign(Object.assign({}, objectWithMockedFunctions), result);
        };
    }
    _mockFunction({ terms, mockClassParams, }) {
        const jestSpyStrategy = jest_spy_service_1.jestSpyService.strategyFromTerms({ terms, mockClassParams });
        return jestSpyStrategy.mockImplementationFactory();
    }
}
exports.MockerJestClassStrategy = MockerJestClassStrategy;
//# sourceMappingURL=mocker-jest-class-strategy.js.map