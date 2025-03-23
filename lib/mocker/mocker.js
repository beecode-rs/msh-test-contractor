"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mocker = void 0;
var _vitest = require("vitest");
var _jestSpyFunctionStrategy = require("#src/jest-spy/jest-spy-function-strategy");
var _mockerService = require("#src/mocker/mocker-service");
var _fnUtil = require("#src/util/fn-util");
// eslint-disable-next-line @typescript-eslint/no-explicit-any

var mocker = exports.mocker = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-parameters
  contract: function contract(_contract) {
    var mockerStrategy = _mockerService.mockerService.strategyFromContract(_contract);
    var spy = mockerStrategy.contractSpy();
    var mockRestore = function mockRestore() {
      mockerStrategy.mockRestore();
    };
    return {
      mockRestore: mockRestore,
      spy: spy
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  "function": function _function(contract, fnName) {
    var _terms$;
    var module = contract.module,
      subjectName = contract.subjectName,
      fns = contract.fns;
    var _ref = fns[fnName],
      terms = _ref.terms;
    var spy =
    // eslint-disable-next-line no-ternary
    _fnUtil.fnUtil.isConstructor(fnName) ? _vitest.vi.spyOn(module, subjectName) :
    // eslint-disable-next-line no-ternary
    (_terms$ = terms[0]) !== null && _terms$ !== void 0 && _terms$.constructorParams // if function belongs to class mock prototype
    ? _vitest.vi.spyOn(module[subjectName].prototype, fnName) : _vitest.vi.spyOn(module[subjectName], fnName);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!terms) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error("Terms not found in function ".concat(fnName, " for module ").concat(subjectName));
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    var jestSpyFunction = new _jestSpyFunctionStrategy.JestSpyFunctionStrategy({
      name: "".concat(subjectName, ".").concat(fnName),
      terms: terms
    });
    spy.mockImplementation(jestSpyFunction.mockImplementationFactory());
    var mockRestore = function mockRestore() {
      spy.mockRestore();
    };
    return {
      mockRestore: mockRestore,
      spy: spy
    };
  }
};