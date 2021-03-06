"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_jest_strategy_1 = require("./mock-jest-strategy");
describe('MockJestStrategy', () => {
    describe('mock', () => {
        it('should set restoreMockFn to empty array if jestMock is not defined', () => {
            const strategy = new mock_jest_strategy_1.MockJestStrategy();
            const params = [];
            strategy.mock({ params });
            expect(strategy['_restoreMockFn']).toEqual([]);
        });
        it('should call jest mock with params', () => {
            const dummyJestMockResult = { test: 'test' };
            const dummyJestMock = jest.fn().mockReturnValue(dummyJestMockResult);
            const strategy = new mock_jest_strategy_1.MockJestStrategy(dummyJestMock);
            const params = [];
            strategy.mock({ params });
            expect(strategy['_restoreMockFn']).toEqual(dummyJestMockResult);
            expect(dummyJestMock).toHaveBeenCalledTimes(1);
        });
    });
    describe('restore', () => {
        it('should do nothing if restoreMockFn is not set', () => {
            const strategy = new mock_jest_strategy_1.MockJestStrategy();
            expect(strategy['_restoreMockFn']).toBeUndefined();
            strategy.restore();
        });
        it('should do nothing if restoreMockFn is empty array', () => {
            const strategy = new mock_jest_strategy_1.MockJestStrategy();
            strategy['_restoreMockFn'] = [];
            strategy.restore();
        });
        it('should call multiple functions stored in restoreMockFn', () => {
            const strategy = new mock_jest_strategy_1.MockJestStrategy();
            const mockFnArr = [jest.fn(), jest.fn(), jest.fn()];
            strategy['_restoreMockFn'] = mockFnArr;
            strategy.restore();
            mockFnArr.forEach((fn) => expect(fn).toHaveBeenCalledTimes(1));
        });
    });
});
//# sourceMappingURL=mock-jest-strategy.test.js.map