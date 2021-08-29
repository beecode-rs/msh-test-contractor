"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const dummyContract = { dummy: 'contract' };
exports.default = contractor_factory_1.contractFactory(require('./mocker-jest-object-strategy'), 'MockerJestObjectStrategy', {
    _constructor: {
        terms: [
            {
                params: [dummyContract],
                result: { _contract: dummyContract },
            },
        ],
    },
});
//# sourceMappingURL=mocker-jest-object-strategy.contract.js.map