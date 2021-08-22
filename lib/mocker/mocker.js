"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mocker = void 0;
const jest_spy_function_strategy_1 = require("../jest-spy/jest-spy-function-strategy");
const fn_util_1 = require("../util/fn-util");
const mocker_service_1 = require("./mocker-service");
exports.mocker = {
    contract: (contract) => {
        const mockerStrategy = mocker_service_1.mockerService.strategyFromContract(contract);
        mockerStrategy.contractSpy();
        return () => {
            mockerStrategy.mockRestore();
        };
    },
    function: (contract, fnName) => {
        const { module, subjectName, fns } = contract;
        const spy = fn_util_1.fnUtil.isConstructor(fnName) ? jest.spyOn(module, subjectName) : jest.spyOn(module[subjectName], fnName);
        const { terms } = fns[fnName];
        if (!terms)
            throw Error(`Terms not found in function ${fnName} for module ${subjectName}`);
        const jestSpyFunction = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms });
        spy.mockImplementation(jestSpyFunction.mockImplementation());
        return () => {
            spy.mockRestore();
        };
    },
};
//# sourceMappingURL=mocker.js.map