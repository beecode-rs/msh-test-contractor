"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnUtil = void 0;
var _specialFnName = require("../enum/special-fn-name.js");
var fnUtil = exports.fnUtil = {
  isConstructor: function isConstructor(fnName) {
    return fnName === _specialFnName.SpecialFnName.CONSTRUCTOR;
  }
};