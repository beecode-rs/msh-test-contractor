"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contractMockService = void 0;
var _mockJestEmptyStrategy = require("#src/contract-mock/mock-jest-empty-strategy");
var _mockJestStrategy = require("#src/contract-mock/mock-jest-strategy");
var contractMockService = exports.contractMockService = {
  strategyFromFunctionMock: function strategyFromFunctionMock(mock) {
    if (mock) {
      return new _mockJestStrategy.MockJestStrategy(mock);
    }
    return new _mockJestEmptyStrategy.MockJestEmptyStrategy();
  }
};