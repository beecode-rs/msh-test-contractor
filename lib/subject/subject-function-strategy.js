"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectFunctionStrategy = void 0;
class SubjectFunctionStrategy {
    constructor({ subjectFromContract: { module, subjectName }, fnName, }) {
        this._subjectName = subjectName;
        this._module = module;
        this._fnName = fnName;
    }
    exec(term) {
        return this.fn()(...term.params);
    }
    fn() {
        return this._subjectName ? this._module[this._subjectName][this._fnName] : this._module[this._fnName];
    }
}
exports.SubjectFunctionStrategy = SubjectFunctionStrategy;
//# sourceMappingURL=subject-function-strategy.js.map