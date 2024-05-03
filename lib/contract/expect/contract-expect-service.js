"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contractExpectService = void 0;
var _contractExpectAnyEqualStrategy = require("#src/contract/expect/contract-expect-any-equal-strategy");
var _contractExpectFunctionResultEqualStrategy = require("#src/contract/expect/contract-expect-function-result-equal-strategy");
var _contractExpectThrowErrorStrategy = require("#src/contract/expect/contract-expect-throw-error-strategy");
var contractExpectService = exports.contractExpectService = {
  fromTerm: function fromTerm(params) {
    var term = params.term;
    if (term.result instanceof Error) {
      return new _contractExpectThrowErrorStrategy.ContractExpectThrowErrorStrategy({
        term: term
      });
    }
    if (term.returnFnParams) {
      return new _contractExpectFunctionResultEqualStrategy.ContractExpectFunctionResultEqualStrategy({
        term: term
      });
    }
    return new _contractExpectAnyEqualStrategy.ContractExpectAnyEqualStrategy({
      term: term
    });
  }
};