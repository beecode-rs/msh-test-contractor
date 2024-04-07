"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contractExpectService = void 0;
var _contractExpectAnyEqualStrategy = require("../../contract/expect/contract-expect-any-equal-strategy.js");
var _contractExpectFunctionResultEqualStrategy = require("../../contract/expect/contract-expect-function-result-equal-strategy.js");
var _contractExpectThrowErrorStrategy = require("../../contract/expect/contract-expect-throw-error-strategy.js");
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