"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_jest_empty_strategy_1 = require("./mock-jest-empty-strategy");
describe('MockJestEmptyStrategy', () => {
    describe('mock', () => {
        it('should do nothing', () => {
            const strategy = new mock_jest_empty_strategy_1.MockJestEmptyStrategy();
            strategy.mock();
        });
    });
    describe('restore', () => {
        it('should do nothing', () => {
            const strategy = new mock_jest_empty_strategy_1.MockJestEmptyStrategy();
            strategy.restore();
        });
    });
});
//# sourceMappingURL=mock-jest-empty-strategy.test.js.map