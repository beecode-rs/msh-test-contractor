"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const mocker_1 = require("../mocker/mocker");
const selfContract = contractor_factory_1.contractFactory(require('./type-util'), 'typeUtil', {
    isClass: {
        mock: {
            jest: (_jest) => {
                return [mocker_1.mocker.function(selfContract, 'isObject'), mocker_1.mocker.function(selfContract, 'isFunction')];
            },
        },
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
    isFunction: {
        terms: [
            {
                params: [Date],
                result: true,
            },
            {
                params: [{}],
                result: false,
            },
            {
                params: [
                    () => {
                        return;
                    },
                ],
                result: true,
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=type-util.contract.js.map