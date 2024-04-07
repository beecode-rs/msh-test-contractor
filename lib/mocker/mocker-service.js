"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockerService = void 0;
var _specialFnName = require("../enum/special-fn-name.js");
var _mockerJestClassStrategy = require("../mocker/mocker-jest-class-strategy.js");
var _mockerJestFunctionStrategy = require("../mocker/mocker-jest-function-strategy.js");
var _mockerJestObjectStrategy = require("../mocker/mocker-jest-object-strategy.js");
var _typeUtil = require("../util/type-util.js");
var mockerService = exports.mockerService = {
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