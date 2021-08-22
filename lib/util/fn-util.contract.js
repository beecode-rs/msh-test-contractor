"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
exports.default = contractor_factory_1.contractFactory(require('./fn-util'), 'fnUtil', {
    isConstructor: {
        terms: [
            {
                params: ['someFnName'],
                result: false,
            },
            {
                params: ['_constructor'],
                result: true,
            },
        ],
    },
});
//# sourceMappingURL=fn-util.contract.js.map