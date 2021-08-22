"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JestSpyConstructorStrategy = void 0;
class JestSpyConstructorStrategy {
    constructor({ subjectFromContract: { module, subjectName } }) {
        this._subjectName = subjectName;
        this._module = module;
    }
    mockImplementation() {
        // return jest.spyOn(this._module, this._subjectName).mockImplementation(jestSpyService.simpleMock(terms))
        throw new Error('not implemented');
    }
}
exports.JestSpyConstructorStrategy = JestSpyConstructorStrategy;
//# sourceMappingURL=jest-spy-constructor-strategy.js.map