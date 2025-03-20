"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectUtil = void 0;
var objectUtil = exports.objectUtil = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringifyOrNullUndefined: function stringifyOrNullUndefined(param) {
    if (param == null) {
      return param;
    }
    return JSON.stringify(param, Object.keys(param).sort());
  }
};