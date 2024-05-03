"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnUtil = void 0;
var _specialFnName = require("#src/enum/special-fn-name");
var fnUtil = exports.fnUtil = {
  isConstructor: function isConstructor(fnName) {
    return fnName === _specialFnName.SpecialFnName.CONSTRUCTOR;
  }
};