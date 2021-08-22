"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const mocker_1 = require("../mocker/mocker");
const dummyModule = {
    dummySubject: {
        a: (_a) => _a,
    },
};
const dummySubjectName = 'dummySubject';
const dummyFnName = 'a';
const dummyConstructorParams = () => {
    return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName }, fnName: dummyFnName }];
};
const selfContract = contractor_factory_1.contractFactory(require('./subject-function-strategy'), 'SubjectFunctionStrategy', {
    _constructor: {
        terms: [
            {
                params: dummyConstructorParams(),
                result: { _subjectName: dummySubjectName, _module: dummyModule, _fnName: dummyFnName },
            },
        ],
    },
    fn: {
        terms: [
            {
                constructorParams: dummyConstructorParams(),
                params: [],
                result: dummyModule.dummySubject.a,
            },
        ],
    },
    exec: {
        mock: {
            jest: (_jest) => {
                return [mocker_1.mocker.function(selfContract, 'fn')];
            },
        },
        terms: [
            {
                constructorParams: dummyConstructorParams(),
                params: [{ params: ['testParam'] }],
                result: 'testParam',
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=subject-function-strategy.contract.js.map