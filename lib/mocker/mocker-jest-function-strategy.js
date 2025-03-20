"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockerJestFunctionStrategy = void 0;
var _vitest = require("vitest");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var MockerJestFunctionStrategy = exports.MockerJestFunctionStrategy = /*#__PURE__*/function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  function MockerJestFunctionStrategy(_contract) {
    _classCallCheck(this, MockerJestFunctionStrategy);
    this._contract = _contract;
  }
  return _createClass(MockerJestFunctionStrategy, [{
    key: "mockRestore",
    value: function mockRestore() {
      if (this._spy) {
        this._spy.mockRestore();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "contractSpy",
    value: function contractSpy() {
      var _this$_contract = this._contract,
        module = _this$_contract.module,
        subjectName = _this$_contract.subjectName;
      this._spy = _vitest.vi.spyOn(module, subjectName);
      return this._spy;
    }
  }]);
}();