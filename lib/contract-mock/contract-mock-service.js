"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractMockService = void 0;
const mock_jest_empty_strategy_1 = require("./mock-jest-empty-strategy");
const mock_jest_strategy_1 = require("./mock-jest-strategy");
exports.contractMockService = {
    strategyFromFunctionMock: (mock) => {
        if (mock === null || mock === void 0 ? void 0 : mock.jest)
            return new mock_jest_strategy_1.MockJestStrategy(mock.jest);
        return new mock_jest_empty_strategy_1.MockJestEmptyStrategy();
    },
};
//# sourceMappingURL=contract-mock-service.js.map