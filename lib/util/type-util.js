"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeUtil = void 0;
exports.typeUtil = {
    isClass: (module) => {
        return exports.typeUtil.isObject(module) && exports.typeUtil.isFunction(module);
    },
    isObject: (module) => {
        return module instanceof Object;
    },
    isFunction: (module) => {
        return module instanceof Function;
    },
};
//# sourceMappingURL=type-util.js.map