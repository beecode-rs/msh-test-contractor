"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jestSpyService = void 0;
var _jestSpyClassFunctionStrategy = require("#src/jest-spy/jest-spy-class-function-strategy");
var _jestSpyFunctionStrategy = require("#src/jest-spy/jest-spy-function-strategy");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var jestSpyService = exports.jestSpyService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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