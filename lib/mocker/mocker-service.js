"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockerService = void 0;
var _specialFnName = require("#src/enum/special-fn-name");
var _mockerJestClassStrategy = require("#src/mocker/mocker-jest-class-strategy");
var _mockerJestFunctionStrategy = require("#src/mocker/mocker-jest-function-strategy");
var _mockerJestObjectStrategy = require("#src/mocker/mocker-jest-object-strategy");
var _typeUtil = require("#src/util/type-util");
var mockerService = exports.mockerService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strategyFromContract: function strategyFromContract(contract) {
    var module = contract.module,
      subjectName = contract.subjectName,
      fns = contract.fns;
    var subject = module[subjectName];
    var selfFunction = fns[_specialFnName.SpecialFnName.SELF];
    if (_typeUtil.typeUtil.isFunction(subject) && selfFunction) {
      return new _mockerJestFunctionStrategy.MockerJestFunctionStrategy(contract);
    }
    if (_typeUtil.typeUtil.isClass(subject)) {
      return new _mockerJestClassStrategy.MockerJestClassStrategy(contract);
    }
    if (_typeUtil.typeUtil.isObject(subject)) {
      return new _mockerJestObjectStrategy.MockerJestObjectStrategy(contract);
    }
    throw new Error('Unknown mocker');
  }
};