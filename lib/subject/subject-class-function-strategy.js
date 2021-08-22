"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectClassFunctionStrategy = void 0;
class SubjectClassFunctionStrategy {
    constructor({ subjectFromContract: { module, subjectName }, constructorParams, fnName, }) {
        this._module = module;
        this._subjectName = subjectName;
        this._constructorParams = constructorParams;
        this._fnName = fnName;
    }
    exec(term) {
        return new (this.fn())(...this._constructorParams)[this._fnName](...term.params);
    }
    fn() {
        return this._module[this._subjectName];
    }
}
exports.SubjectClassFunctionStrategy = SubjectClassFunctionStrategy;
//# sourceMappingURL=subject-class-function-strategy.js.map