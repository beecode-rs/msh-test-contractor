"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const dummyTerms = {
    terms: [
        { params: [1, 2, 3], result: 6 },
        { params: [2, 3, 4], result: 7 },
        { params: [3, 4, 5], result: 8 },
    ],
};
const selfContract = contractor_factory_1.contractFactory(require('./jest-spy-function-strategy'), 'JestSpyFunctionStrategy', {
    _constructor: {
        terms: [
            {
                params: [dummyTerms],
                result: { _terms: dummyTerms.terms },
            },
        ],
    },
    mockImplementationFactory: {
        terms: [
            {
                constructorParams: [dummyTerms],
                params: [],
                returnFnParams: dummyTerms.terms[0].params,
                result: dummyTerms.terms[0].result,
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=jest-spy-function-strategy.contract.js.map