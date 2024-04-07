"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mocker = void 0;
var _globals = require("@jest/globals");
var _jestSpyFunctionStrategy = require("../jest-spy/jest-spy-function-strategy.js");
var _mockerService = require("../mocker/mocker-service.js");
var _fnUtil = require("../util/fn-util.js");
var mocker = exports.mocker = {
  contract: function contract(_contract) {
    var mockerStrategy = _mockerService.mockerService.strategyFromContract(_contract);
    var spy = mockerStrategy.contractSpy();
    var mockRestore = function mockRestore() {
      return mockerStrategy.mockRestore();
    };
    return {
      mockRestore: mockRestore,
      spy: spy
    };
  },
  "function": function _function(contract, fnName) {
    var _terms$;
    var module = contract.module,
      subjectName = contract.subjectName,
      fns = contract.fns;
    var _ref = fns[fnName],
      terms = _ref.terms;
    var spy = _fnUtil.fnUtil.isConstructor(fnName) ? _globals.jest.spyOn(module, subjectName) : (_terms$ = terms[0]) !== null && _terms$ !== void 0 && _terms$.constructorParams // if function belongs to class mock prototype
    ? _globals.jest.spyOn(module[subjectName].prototype, fnName) : _globals.jest.spyOn(module[subjectName], fnName);
    if (!terms) {
      throw new Error("Terms not found in function ".concat(fnName, " for module ").concat(subjectName));
    }
    var jestSpyFunction = new _jestSpyFunctionStrategy.JestSpyFunctionStrategy({
      name: "".concat(subjectName, ".").concat(fnName),
      terms: terms
    });
    spy.mockImplementation(jestSpyFunction.mockImplementationFactory());
    var mockRestore = function mockRestore() {
      return spy.mockRestore();
    };
    return {
      mockRestore: mockRestore,
      spy: spy
    };
  }
};