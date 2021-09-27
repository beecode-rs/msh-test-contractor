"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectUtil = void 0;
exports.objectUtil = {
    stringifyOrNullUndefined: (param) => {
        if (param == null)
            return param;
        return JSON.stringify(param, Object.keys(param).sort());
    },
};
//# sourceMappingURL=object-util.js.map