"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectFunctionStrategy = void 0;
const special_fn_name_1 = require("../enum/special-fn-name");
class SubjectFunctionStrategy {
    constructor({ subjectFromContract: { module, subjectName }, fnName, }) {
        this._subjectName = subjectName;
        this._module = module;
        this._fnName = fnName;
    }
    exec(term) {
        const func = this.fn();
        return func(...term.params);
    }
    fn() {
        return this._fnName === special_fn_name_1.SpecialFnName.SELF ? this._module[this._subjectName] : this._module[this._subjectName][this._fnName];
    }
}
exports.SubjectFunctionStrategy = SubjectFunctionStrategy;
//# sourceMappingURL=subject-function-strategy.js.map