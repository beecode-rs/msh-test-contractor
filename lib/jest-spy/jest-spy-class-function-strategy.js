"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JestSpyClassFunctionStrategy = void 0;
var _es = _interopRequireDefault(require("fast-deep-equal/es6"));
var _jestSpyFunctionStrategy = require("../jest-spy/jest-spy-function-strategy.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var JestSpyClassFunctionStrategy = exports.JestSpyClassFunctionStrategy = /*#__PURE__*/function () {
  function JestSpyClassFunctionStrategy(params) {
    _classCallCheck(this, JestSpyClassFunctionStrategy);
    var terms = params.terms,
      mockClassParams = params.mockClassParams,
      name = params.name;
    this._terms = terms;
    this._mockClassParams = mockClassParams;
    this._name = name;
  }
  return _createClass(JestSpyClassFunctionStrategy, [{
    key: "mockImplementationFactory",
    value: function mockImplementationFactory() {
      var _this = this;
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