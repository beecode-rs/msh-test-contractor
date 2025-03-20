"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockerJestClassStrategy = void 0;
var _vitest = require("vitest");
var _specialFnName = require("#src/enum/special-fn-name");
var _jestSpyFunctionStrategy = require("#src/jest-spy/jest-spy-function-strategy");
var _jestSpyService = require("#src/jest-spy/jest-spy-service");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var MockerJestClassStrategy = exports.MockerJestClassStrategy = /*#__PURE__*/function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  function MockerJestClassStrategy(_contract) {
    _classCallCheck(this, MockerJestClassStrategy);
    this._contract = _contract;
  }
  return _createClass(MockerJestClassStrategy, [{
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
      var functionNames = this._functionNames(module[subjectName]);
      this._spy = _vitest.vi.spyOn(module, subjectName);
      this._spy.mockImplementation(this._mockClass(functionNames));
      return this._spy;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "_functionNames",
    value: function _functionNames(classObject) {
      return Object.getOwnPropertyNames(classObject.prototype).filter(function (fn) {
        return fn !== 'constructor';
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "_mockClass",
    value: function _mockClass(functionNames) {
      var _this = this;
      var _this$_contract2 = this._contract,
        fns = _this$_contract2.fns,
        subjectName = _this$_contract2.subjectName;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function () {
        for (var _len = arguments.length, mockParams = new Array(_len), _key = 0; _key < _len; _key++) {
          mockParams[_key] = arguments[_key];
        }
        var _SpecialFnName$CONSTR = _specialFnName.SpecialFnName.CONSTRUCTOR,
          constructorFns = fns[_SpecialFnName$CONSTR],
          restFns = _objectWithoutProperties(fns, [_SpecialFnName$CONSTR].map(_toPropertyKey));
        var objectWithMockedFunctions = Object.fromEntries(functionNames.map(function (fnName) {
          var _restFns$fnName;
          var mockFn = _vitest.vi.fn();
          if ((_restFns$fnName = restFns[fnName]) !== null && _restFns$fnName !== void 0 && _restFns$fnName.terms) {
            var mockImpl = _this._mockFunction({
              mockClassParams: mockParams,
              name: "".concat(subjectName, ".").concat(fnName),
              terms: restFns[fnName].terms
            });
            mockFn.mockImplementation(mockImpl);
          }
          return [fnName, mockFn];
        }));
        var constructorJestSpy = new _jestSpyFunctionStrategy.JestSpyFunctionStrategy({
          name: subjectName,
          terms: constructorFns.terms
        });
        var constructorMockImplementation = constructorJestSpy.mockImplementationFactory();
        var constructorResultObject = constructorMockImplementation.apply(void 0, mockParams);
        return _objectSpread(_objectSpread({}, objectWithMockedFunctions), constructorResultObject);
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "_mockFunction",
    value: function _mockFunction(params) {
      var terms = params.terms,
        mockClassParams = params.mockClassParams,
        name = params.name;
      var jestSpyStrategy = _jestSpyService.jestSpyService.strategyFromTerms({
        mockClassParams: mockClassParams,
        name: name,
        terms: terms
      });
      return jestSpyStrategy.mockImplementationFactory();
    }
  }]);
}();