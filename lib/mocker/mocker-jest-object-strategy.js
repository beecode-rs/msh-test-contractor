"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockerJestObjectStrategy = void 0;
var _vitest = require("vitest");
var _jestSpyFunctionStrategy = require("#src/jest-spy/jest-spy-function-strategy");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var MockerJestObjectStrategy = exports.MockerJestObjectStrategy = /*#__PURE__*/function () {
  function MockerJestObjectStrategy(_contract) {
    _classCallCheck(this, MockerJestObjectStrategy);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _defineProperty(this, "_spies", []);
    this._contract = _contract;
  }
  return _createClass(MockerJestObjectStrategy, [{
    key: "mockRestore",
    value: function mockRestore() {
      this._spies.forEach(function (spy) {
        return spy.mockRestore();
      });
    }
  }, {
    key: "contractSpy",
    value: function contractSpy() {
      return this._mockObject();
    }
  }, {
    key: "_mockObject",
    value: function _mockObject() {
      var _this = this;
      var _this$_contract = this._contract,
        module = _this$_contract.module,
        subjectName = _this$_contract.subjectName;
      return Object.fromEntries(Object.entries(this._contract.fns).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          fnName = _ref2[0],
          ctFunc = _ref2[1];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        var jestSpyFunction = new _jestSpyFunctionStrategy.JestSpyFunctionStrategy({
          name: "".concat(subjectName, ".").concat(fnName),
          terms: ctFunc.terms
        });
        var spy = _vitest.vi.spyOn(module[subjectName], fnName).mockImplementation(jestSpyFunction.mockImplementationFactory());
        _this._spies.push(spy);
        return [fnName, spy];
      }));
    }
  }]);
}();