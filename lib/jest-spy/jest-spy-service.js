"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jestSpyService = void 0;
var _jestSpyClassFunctionStrategy = require("../jest-spy/jest-spy-class-function-strategy.js");
var _jestSpyFunctionStrategy = require("../jest-spy/jest-spy-function-strategy.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var jestSpyService = exports.jestSpyService = {
  strategyFromTerms: function strategyFromTerms(params) {
    var terms = params.terms,
      mockClassParams = params.mockClassParams,
      name = params.name;
    if (terms.length === 0) {
      throw new Error('Terms missing');
    }
    var _terms = _slicedToArray(terms, 1),
      _terms$ = _terms[0],
      _terms$2 = _terms$ === void 0 ? {
        constructorParams: undefined
      } : _terms$,
      constructorParams = _terms$2.constructorParams;
    if (mockClassParams && constructorParams) {
      return new _jestSpyClassFunctionStrategy.JestSpyClassFunctionStrategy({
        mockClassParams: mockClassParams,
        name: name,
        terms: terms
      });
    }
    return new _jestSpyFunctionStrategy.JestSpyFunctionStrategy({
      name: name,
      terms: terms
    });
  }
};