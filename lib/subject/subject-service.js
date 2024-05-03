"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subjectService = void 0;
var _specialFnName = require("#src/enum/special-fn-name");
var _subjectClassFunctionStrategy = require("#src/subject/subject-class-function-strategy");
var _subjectConstructorStrategy = require("#src/subject/subject-constructor-strategy");
var _subjectFunctionStrategy = require("#src/subject/subject-function-strategy");
var _fnUtil = require("#src/util/fn-util");
var subjectService = exports.subjectService = {
  strategyFromContractFunction: function strategyFromContractFunction(params) {
    var _params$contract = params.contract,
      module = _params$contract.module,
      subjectName = _params$contract.subjectName,
      fns = _params$contract.fns,
      fnName = params.fnName,
      constructorParams = params.term.constructorParams;
    var subjectFromContract = {
      module: module,
      subjectName: subjectName
    };
    if (_fnUtil.fnUtil.isConstructor(fnName)) {
      return new _subjectConstructorStrategy.SubjectConstructorStrategy({
        subjectFromContract: subjectFromContract
      });
    }
    if (Object.keys(fns !== null && fns !== void 0 ? fns : {}).includes(_specialFnName.SpecialFnName.CONSTRUCTOR)) {
      if (!constructorParams) {
        throw new Error("Missing constructorParams in contract: ".concat(subjectName, ".").concat(fnName));
      }
      return new _subjectClassFunctionStrategy.SubjectClassFunctionStrategy({
        constructorParams: constructorParams,
        fnName: fnName,
        subjectFromContract: subjectFromContract
      });
    }
    return new _subjectFunctionStrategy.SubjectFunctionStrategy({
      fnName: fnName,
      subjectFromContract: subjectFromContract
    });
  }
};