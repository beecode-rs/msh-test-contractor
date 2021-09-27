"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mocker = void 0;
const jest_spy_function_strategy_1 = require("../jest-spy/jest-spy-function-strategy");
const fn_util_1 = require("../util/fn-util");
const mocker_service_1 = require("./mocker-service");
exports.mocker = {
    contract: (contract) => {
        const mockerStrategy = mocker_service_1.mockerService.strategyFromContract(contract);
        const spy = mockerStrategy.contractSpy();
        const mockRestore = () => mockerStrategy.mockRestore();
        return { mockRestore, spy };
    },
    function: (contract, fnName) => {
        const { module, subjectName, fns } = contract;
        const { terms } = fns[fnName];
        const spy = fn_util_1.fnUtil.isConstructor(fnName)
            ? jest.spyOn(module, subjectName)
            : terms[0].constructorParams // if function belongs to class mock prototype
                ? jest.spyOn(module[subjectName].prototype, fnName)
                : jest.spyOn(module[subjectName], fnName);
        if (!terms)
            throw new Error(`Terms not found in function ${fnName} for module ${subjectName}`);
        const jestSpyFunction = new jest_spy_function_strategy_1.JestSpyFunctionStrategy({ terms, name: `${subjectName}.${fnName}` });
        spy.mockImplementation(jestSpyFunction.mockImplementationFactory());
        const mockRestore = () => spy.mockRestore();
        return { mockRestore, spy };
    },
};
//# sourceMappingURL=mocker.js.map