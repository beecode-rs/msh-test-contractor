"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectClassFunctionStrategy = void 0;
class SubjectClassFunctionStrategy {
    constructor({ subjectFromContract: { module, subjectName }, constructorParams, fnName, }) {
        this._module = module;
        if (!subjectName)
            throw new Error('Subject name must be specified for class functions strategy');
        this._subjectName = subjectName;
        this._constructorParams = constructorParams;
        this._fnName = fnName;
    }
    exec(term) {
        const obj = new (this.fn())(...this._constructorParams);
        if (this._isGetter())
            return obj[this._fnName];
        return obj[this._fnName](...term.params);
    }
    fn() {
        return this._module[this._subjectName];
    }
    _isGetter() {
        var _a;
        return !!((_a = Object.getOwnPropertyDescriptor(this._module[this._subjectName].prototype, this._fnName)) === null || _a === void 0 ? void 0 : _a.get);
    }
}
exports.SubjectClassFunctionStrategy = SubjectClassFunctionStrategy;
//# sourceMappingURL=subject-class-function-strategy.js.map