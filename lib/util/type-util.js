"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeUtil = void 0;
var typeUtil = exports.typeUtil = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isClass: function isClass(module) {
    return typeUtil.isObject(module) && typeUtil.isFunction(module);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFunction: function isFunction(module) {
    return module instanceof Function;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isObject: function isObject(module) {
    return module instanceof Object;
  }
};