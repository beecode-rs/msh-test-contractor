"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockerService = void 0;
const special_fn_name_1 = require("../enum/special-fn-name");
const type_util_1 = require("../util/type-util");
const mocker_jest_class_strategy_1 = require("./mocker-jest-class-strategy");
const mocker_jest_function_strategy_1 = require("./mocker-jest-function-strategy");
const mocker_jest_object_strategy_1 = require("./mocker-jest-object-strategy");
exports.mockerService = {
    strategyFromContract: (contract) => {
        const { module, subjectName, fns } = contract;
        const subject = module[subjectName];
        const { [special_fn_name_1.SpecialFnName.SELF]: selfFunction } = fns;
        if (type_util_1.typeUtil.isFunction(subject) && selfFunction)
            return new mocker_jest_function_strategy_1.MockerJestFunctionStrategy(contract);
        if (type_util_1.typeUtil.isClass(subject))
            return new mocker_jest_class_strategy_1.MockerJestClassStrategy(contract);
        if (type_util_1.typeUtil.isObject(subject))
            return new mocker_jest_object_strategy_1.MockerJestObjectStrategy(contract);
        throw new Error('Unknown mocker');
    },
};
//# sourceMappingURL=mocker-service.js.map