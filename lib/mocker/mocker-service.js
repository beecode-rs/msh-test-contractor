"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockerService = void 0;
const type_util_1 = require("../util/type-util");
const mocker_jest_class_strategy_1 = require("./mocker-jest-class-strategy");
const mocker_jest_object_strategy_1 = require("./mocker-jest-object-strategy");
exports.mockerService = {
    strategyFromContract: (contract) => {
        const { module, subjectName } = contract;
        const subject = module[subjectName];
        if (type_util_1.typeUtil.isClass(subject))
            return new mocker_jest_class_strategy_1.MockerJestClassStrategy(contract);
        if (type_util_1.typeUtil.isObject(subject))
            return new mocker_jest_object_strategy_1.MockerJestObjectStrategy(contract);
        throw new Error('Unknown mocker');
    },
};
//# sourceMappingURL=mocker-service.js.map