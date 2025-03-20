"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JestSpyFunctionStrategy = void 0;
var _vitest = require("vitest");
var _objectUtil = require("#src/util/object-util");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var JestSpyFunctionStrategy = exports.JestSpyFunctionStrategy = /*#__PURE__*/function () {
  function JestSpyFunctionStrategy(params) {
    _classCallCheck(this, JestSpyFunctionStrategy);
    var terms = params.terms,
      name = params.name;
    this._terms = terms;
    this._name = name;
  }
  return _createClass(JestSpyFunctionStrategy, [{
    key: "mockImplementationFactory",
    value: function mockImplementationFactory() {
      var _this = this;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var fakeImplementation = function fakeImplementation() {
        for (var _len = arguments.length, mockParams = new Array(_len), _key = 0; _key < _len; _key++) {
          mockParams[_key] = arguments[_key];
        }
        var foundTerm = _this._terms.find(function (term) {
          return _objectUtil.objectUtil.stringifyOrNullUndefined(term.params) === _objectUtil.objectUtil.stringifyOrNullUndefined(mockParams);
        });
        if (!foundTerm) {
          throw new Error("Unknown contract ".concat(_this._name, " for params ").concat(JSON.stringify(mockParams)));
        }
        return foundTerm.result;
      };
      return _vitest.vi.fn().mockImplementation(fakeImplementation);
    }
  }]);
}();