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
        const functionNames = this._functionNames(module[subjectName]);
        this._spy = jest.spyOn(module, subjectName);
        this._spy.mockImplementation(this._mockClass(functionNames));
        return this._spy;
    }
    _functionNames(classObject) {
        return Object.getOwnPropertyNames(classObject.prototype).filter((fn) => fn !== 'constructor');
    }
    _mockClass(functionNames) {
        const { fns, subjectName } = this._contract;
        return (...mockParams) => {
            const _a = fns, _b = special_fn_name_1.SpecialFnName.CONSTRUCTOR, constructorFns = _a[_b], restFns = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            const objectWithMockedFunctions = Object.fromEntries(functionNames.map((fnName) => {
                var _a;
                const mockFn = jest.fn();
                if ((_a = restFns[fnName]) === null || _a === void 0 ? void 0 : _a.terms) {
                    const mockImpl = this._mockFunction({
                        terms: restFns[fnName].terms,
                        mockClassParams: mockParams,
                        name: `${subjectName}.${fnName}`,
                    });
                    mockFn.mockImplementation(mockImpl);
                }
                return [fnName, mockFn];
            }));
            const constructorJestSpy = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms: constructorFns.terms, name: subjectName });
            const constructorMockImplementation = constructorJestSpy.mockImplementationFactory();
            const constructorResultObject = constructorMockImplementation(...mockParams);
            return Object.assign(Object.assign({}, objectWithMockedFunctions), constructorResultObject);
        };
    }
    _mockFunction({ terms, mockClassParams, name, }) {
        const jestSpyStrategy = jest_spy_service_1.jestSpyService.strategyFromTerms({ terms, mockClassParams, name });
        return jestSpyStrategy.mockImplementationFactory();
    }
}
exports.MockerJestClassStrategy = MockerJestClassStrategy;
//# sourceMappingURL=mocker-jest-class-strategy.js.map