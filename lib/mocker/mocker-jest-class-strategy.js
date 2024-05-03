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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MockerJestClassStrategy = exports.MockerJestClassStrategy = /*#__PURE__*/function () {
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
  }, {
    key: "_functionNames",
    value: function _functionNames(classObject) {
      return Object.getOwnPropertyNames(classObject.prototype).filter(function (fn) {
        return fn !== 'constructor';
      });
    }
  }, {
    key: "_mockClass",
    value: function _mockClass(functionNames) {
      var _this = this;
      var _this$_contract2 = this._contract,
        fns = _this$_contract2.fns,
        subjectName = _this$_contract2.subjectName;
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