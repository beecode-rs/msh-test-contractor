"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const mocker_1 = require("../mocker/mocker");
const mock_jest_empty_strategy_contract_1 = __importDefault(require("./mock-jest-empty-strategy.contract"));
const mock_jest_strategy_contract_1 = __importDefault(require("./mock-jest-strategy.contract"));
exports.default = contractor_factory_1.contractFactory(require('./contract-mock-service.ts'), 'contractMockService', {
    strategyFromFunctionMock: {
        mock: {
            jest: (_jest) => {
                return [mocker_1.mocker.contract(mock_jest_strategy_contract_1.default), mocker_1.mocker.contract(mock_jest_empty_strategy_contract_1.default)];
            },
        },
        terms: [
            {
                params: [],
                result: {},
            },
        ],
    },
});
//# sourceMappingURL=contract-mock-service.contract.js.map