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
const dummyFnName = 'a';
const dummyConstructorParams = [];
const dummyConstructorParamsFactory = () => {
    return [
        {
            subjectFromContract: { module: dummyModule, subjectName: dummySubjectName },
            constructorParams: dummyConstructorParams,
            fnName: dummyFnName,
        },
    ];
};
const selfContract = contractor_factory_1.contractFactory(require('./subject-class-function-strategy'), 'SubjectClassFunctionStrategy', {
    _constructor: {
        terms: [
            {
                params: dummyConstructorParamsFactory(),
                result: {
                    _subjectName: dummySubjectName,
                    _module: dummyModule,
                    _constructorParams: dummyConstructorParams,
                    _fnName: dummyFnName,
                },
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
                params: [{ params: ['testString'] }],
                result: 'testString',
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=subject-class-function-strategy.contract.js.map