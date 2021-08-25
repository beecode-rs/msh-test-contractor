"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const mocker_1 = require("../mocker/mocker");
class DummyClass {
    a(_a) {
        return _a;
    }
}
const dummyModule = { DummyClass };
const dummySubjectName = 'DummyClass';
const dummyConstructorParamsFactory = () => {
    return [{ subjectFromContract: { module: dummyModule, subjectName: dummySubjectName } }];
};
const selfContract = contractor_factory_1.contractFactory(require('./subject-constructor-strategy'), 'SubjectConstructorStrategy', {
    _constructor: {
        terms: [
            {
                params: dummyConstructorParamsFactory(),
                result: { _subjectName: dummySubjectName, _module: dummyModule },
            },
        ],
    },
    fn: {
        terms: [
            {
                constructorParams: dummyConstructorParamsFactory(),
                params: [],
                result: DummyClass,
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
                constructorParams: dummyConstructorParamsFactory(),
                params: [{ params: [] }],
                result: new DummyClass(),
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=subject-constructor-strategy.contract.js.map