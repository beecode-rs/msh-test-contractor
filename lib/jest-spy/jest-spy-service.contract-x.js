"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
// import jestSpyFunctionStrategyContract from './jest-spy-function-strategy.contract'
const dummyParams = {
    terms: [
        { params: [1, 2, 3], result: 6 },
        { params: [2, 3, 4], result: 7 },
        { params: [3, 4, 5], result: 8 },
    ],
    mockClassParams: [],
};
const selfContract = contractor_factory_1.contractFactory(require('./jest-spy-service'), 'jestSpyService', {
    strategyFromTerms: {
        // mock: {
        //   jest: (_jest: any): ContractMockRevertFns => {
        //     return [mocker.contract(jestSpyFunctionStrategyContract)] // max call stack ??
        //   },
        // },
        terms: [
            // TODO add term when result is error
            {
                params: [dummyParams],
                result: {},
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=jest-spy-service.contract-x.js.map