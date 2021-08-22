"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
exports.default = contractor_factory_1.contractFactory(require('./type-util'), 'typeUtil', {
    isClass: {
        terms: [
            {
                params: [Date],
                result: true,
            },
            {
                params: [{}],
                result: false,
            },
        ],
    },
    isObject: {
        terms: [
            {
                params: [Date],
                result: true,
            },
            {
                params: [{}],
                result: true,
            },
            {
                params: [1],
                result: false,
            },
        ],
    },
});
//# sourceMappingURL=type-util.contract.js.map