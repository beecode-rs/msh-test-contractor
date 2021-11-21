"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectService = void 0;
const special_fn_name_1 = require("../enum/special-fn-name");
const fn_util_1 = require("../util/fn-util");
const subject_class_function_strategy_1 = require("./subject-class-function-strategy");
const subject_constructor_strategy_1 = require("./subject-constructor-strategy");
const subject_function_strategy_1 = require("./subject-function-strategy");
exports.subjectService = {
    strategyFromContractFunction: (params) => {
        const { contract: { module, subjectName, fns }, fnName, term: { constructorParams }, } = params;
        const subjectFromContract = { module, subjectName };
        if (fn_util_1.fnUtil.isConstructor(fnName))
            return new subject_constructor_strategy_1.SubjectConstructorStrategy({ subjectFromContract });
        if (Object.keys(fns !== null && fns !== void 0 ? fns : {}).includes(special_fn_name_1.SpecialFnName.CONSTRUCTOR)) {
            if (!constructorParams)
                throw new Error(`Missing constructorParams in contract: ${subjectName}.${fnName}`);
            return new subject_class_function_strategy_1.SubjectClassFunctionStrategy({ subjectFromContract, constructorParams, fnName });
        }
        return new subject_function_strategy_1.SubjectFunctionStrategy({ subjectFromContract, fnName });
    },
};
//# sourceMappingURL=subject-service.js.map