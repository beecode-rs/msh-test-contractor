"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const special_fn_name_1 = require("../enum/special-fn-name");
const mocker_1 = require("../mocker/mocker");
const selfContract = contractor_factory_1.contractFactory(global, 'Date', {
    _constructor: {
        mock: {
            jest: (jest, { params } = { params: [] }) => {
                var _a;
                const realDate = Date.bind(global.Date);
                const mockedDate = new Date((_a = params[0]) !== null && _a !== void 0 ? _a : '2020-01-01');
                const _Date = Date;
                global.Date = jest.fn(() => mockedDate);
                global.Date.UTC = _Date.UTC;
                global.Date.parse = _Date.parse;
                global.Date.now = _Date.now;
                return [
                    () => {
                        global.Date = realDate;
                    },
                ];
            },
        },
        terms: [
            {
                params: [],
                result: new Date('2020-01-01'),
            },
            {
                params: ['2020-01-01'],
                result: new Date('2020-01-01'),
            },
            {
                params: ['2020-01-02'],
                result: new Date('2020-01-02'),
            },
        ],
    },
    // @ts-ignore
    toISOString: {
        mock: {
            jest: (_jest) => {
                return [mocker_1.mocker.function(selfContract, special_fn_name_1.SpecialFnName.CONSTRUCTOR)];
            },
        },
        terms: [
            {
                constructorParams: [],
                params: [],
                result: '2020-01-01T00:00:00.000Z',
            },
            {
                constructorParams: ['2020-01-02'],
                params: [],
                result: '2020-01-02T00:00:00.000Z',
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=date.contract.js.map