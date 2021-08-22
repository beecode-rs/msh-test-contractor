"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeUtil = void 0;
exports.typeUtil = {
    isClass: (module) => {
        return module instanceof Object && module instanceof Function;
    },
    isObject: (module) => {
        return module instanceof Object;
    },
};
//# sourceMappingURL=type-util.js.map