"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockerJestClassStrategy = void 0;
const special_fn_name_1 = require("../enum/special-fn-name");
const jest_spy_service_1 = require("../jest-spy/jest-spy-service");
const fn_util_1 = require("../util/fn-util");
const deep_equal_1 = __importDefault(require("deep-equal"));
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
            const objectWithMockedFunctions = Object.fromEntries(Object.entries(fns)
                .filter(([fnName]) => !fn_util_1.fnUtil.isConstructor(fnName))
                .map(([fnName, ctFunc]) => {
                return [fnName, this._mockFunction({ fnName, terms: ctFunc.terms, mockClassParams: mockParams })];
            }));
            // TODO should move above mockClass
            const foundTerm = fns[special_fn_name_1.SpecialFnName.CONSTRUCTOR].terms.find((term) => deep_equal_1.default(term.params, mockParams));
            if (!foundTerm)
                throw Error(`Unknown contract for params ${JSON.stringify(mockParams)}`);
            // if (foundTerm instanceof Error) throw foundTerm.result
            foundTerm.result;
            return Object.assign(Object.assign({}, objectWithMockedFunctions), foundTerm.result);
        };
    }
    _mockFunction({ fnName, terms, mockClassParams, }) {
        const jestSpyStrategy = jest_spy_service_1.jestSpyService.strategyFromTerms({ terms, fnName, mockClassParams });
        return jestSpyStrategy.mockImplementation();
    }
}
exports.MockerJestClassStrategy = MockerJestClassStrategy;
//# sourceMappingURL=mocker-jest-class-strategy.js.map