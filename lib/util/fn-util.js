"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnUtil = void 0;
const special_fn_name_1 = require("../enum/special-fn-name");
exports.fnUtil = {
    isConstructor: (fnName) => {
        return fnName === special_fn_name_1.SpecialFnName.CONSTRUCTOR;
    },
};
//# sourceMappingURL=fn-util.js.map