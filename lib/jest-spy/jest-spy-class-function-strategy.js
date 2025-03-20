"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JestSpyClassFunctionStrategy = void 0;
var _es = _interopRequireDefault(require("fast-deep-equal/es6"));
var _jestSpyFunctionStrategy = require("#src/jest-spy/jest-spy-function-strategy");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var JestSpyClassFunctionStrategy = exports.JestSpyClassFunctionStrategy = /*#__PURE__*/function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function JestSpyClassFunctionStrategy(params) {
    _classCallCheck(this, JestSpyClassFunctionStrategy);
    var terms = params.terms,
      mockClassParams = params.mockClassParams,
      name = params.name;
    this._terms = terms;
    this._mockClassParams = mockClassParams;
    this._name = name;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return _createClass(JestSpyClassFunctionStrategy, [{
    key: "mockImplementationFactory",
    value: function mockImplementationFactory() {
      var _this = this;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function () {
        var termByConstructorParams = _this._terms.filter(function (term) {
          return (0, _es["default"])(term.constructorParams, _this._mockClassParams);
        });
        var jestSpy = new _jestSpyFunctionStrategy.JestSpyFunctionStrategy({
          name: _this._name,
          terms: termByConstructorParams
        });
        return jestSpy.mockImplementationFactory().apply(void 0, arguments);
      };
    }
  }]);
}();