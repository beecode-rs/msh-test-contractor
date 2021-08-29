"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const dummyJestMock = (_jest, _options) => {
    return [];
};
exports.default = contractor_factory_1.contractFactory(require('./mock-jest-strategy'), 'MockJestStrategy', {
    _constructor: {
        terms: [
            {
                params: [],
                result: { _jestMock: undefined },
            },
            {
                params: [dummyJestMock],
                result: { _jestMock: dummyJestMock },
            },
        ],
    },
});
//# sourceMappingURL=mock-jest-strategy.contract.js.map