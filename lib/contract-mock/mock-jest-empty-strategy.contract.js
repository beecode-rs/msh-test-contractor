"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
exports.default = contractor_factory_1.contractFactory(require('./mock-jest-empty-strategy'), 'MockJestEmptyStrategy', {
    _constructor: {
        terms: [
            {
                params: [],
                result: {},
            },
            {
                params: [{ jest: [] }],
                result: { _jestMock: undefined },
            },
        ],
    },
});
//# sourceMappingURL=mock-jest-empty-strategy.contract.js.map