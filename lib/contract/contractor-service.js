"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contractorService = void 0;
var contractorService = exports.contractorService = {
  testDescription: function testDescription(params) {
    var fnName = params.fnName;
    return "".concat(fnName, " [contract]");
  },
  testName: function testName(params) {
    var _params$term = params.term,
      termParams = _params$term.params,
      result = _params$term.result;
    return "input: ".concat(JSON.stringify(termParams), "   output: ").concat(JSON.stringify(result));
  }
};