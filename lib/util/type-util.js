"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeUtil = void 0;
var typeUtil = exports.typeUtil = {
  isClass: function isClass(module) {
    return typeUtil.isObject(module) && typeUtil.isFunction(module);
  },
  isFunction: function isFunction(module) {
    return module instanceof Function;
  },
  isObject: function isObject(module) {
    return module instanceof Object;
  }
};