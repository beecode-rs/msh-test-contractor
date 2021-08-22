"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const mocker_1 = require("../mocker/mocker");
class DummySubject {
    a(_a) {
        return _a;
    }
}
const dummyModule = { DummySubject };
const dummySubjectName = 'DummySubject';
const dummyConstructorParams = () => {
    return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }];
};
const selfContract = contractor_factory_1.contractFactory(require('./subject-constructor-strategy'), 'SubjectConstructorStrategy', {
    _constructor: {
        terms: [
            {
                params: dummyConstructorParams(),
                result: { _subjectName: dummySubjectName, _module: dummyModule },
            },
        ],
    },
    fn: {
        terms: [
            {
                constructorParams: dummyConstructorParams(),
                params: [],
                result: DummySubject,
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
                params: [{ params: [] }],
                result: new DummySubject(),
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=subject-constructor-strategy.contract.js.map