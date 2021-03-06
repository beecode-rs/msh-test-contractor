"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectConstructorStrategy = void 0;
class SubjectConstructorStrategy {
    constructor(params) {
        const { subjectFromContract: { module, subjectName }, } = params;
        if (!subjectName)
            throw new Error('Subject name must be specified for class functions strategy');
        this._module = module;
        this._subjectName = subjectName;
    }
    exec(term) {
        return new (this.fn())(...term.params);
    }
    fn() {
        return this._module[this._subjectName];
    }
}
exports.SubjectConstructorStrategy = SubjectConstructorStrategy;
//# sourceMappingURL=subject-constructor-strategy.js.map