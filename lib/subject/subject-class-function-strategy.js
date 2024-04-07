"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubjectClassFunctionStrategy = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SubjectClassFunctionStrategy = exports.SubjectClassFunctionStrategy = /*#__PURE__*/function () {
  function SubjectClassFunctionStrategy(params) {
    _classCallCheck(this, SubjectClassFunctionStrategy);
    var _params$subjectFromCo = params.subjectFromContract,
      module = _params$subjectFromCo.module,
      subjectName = _params$subjectFromCo.subjectName,
      constructorParams = params.constructorParams,
      fnName = params.fnName;
    this._module = module;
    if (!subjectName) {
      throw new Error('Subject name must be specified for class functions strategy');
    }
    this._subjectName = subjectName;
    this._constructorParams = constructorParams;
    this._fnName = fnName;
  }
  return _createClass(SubjectClassFunctionStrategy, [{
    key: "exec",
    value: function exec(term) {
      var obj = _construct(this.fn(), _toConsumableArray(this._constructorParams));
      if (this._isGetter()) {
        return obj[this._fnName];
      }
      return obj[this._fnName].apply(obj, _toConsumableArray(term.params));
    }
  }, {
    key: "fn",
    value: function fn() {
      return this._module[this._subjectName];
    }
  }, {
    key: "_isGetter",
    value: function _isGetter() {
      var _Object$getOwnPropert;
      return !!((_Object$getOwnPropert = Object.getOwnPropertyDescriptor(this._module[this._subjectName].prototype, this._fnName)) !== null && _Object$getOwnPropert !== void 0 && _Object$getOwnPropert.get);
    }
  }]);
}();