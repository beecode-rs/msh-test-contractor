"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
// import { SpecialFnName } from '../enum/special-fn-name'
// import { mocker } from '../mocker/mocker'
// import { ContractMockRevertFns } from '../types/index'
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
        // mock: {
        //   jest: (_jest: any): ContractMockRevertFns => {
        //     return [mocker.function(selfContract, SpecialFnName.CONSTRUCTOR)]
        //   },
        // },
        terms: [
            {
                constructorParams: dummyConstructorParams(),
                params: [],
                result: DummySubject.prototype.a,
            },
        ],
    },
    // exec: {
    //   mock: {
    //     jest: (_jest: any): ContractMockRevertFns => {
    //       return [mocker.function(selfContract, 'fn')]
    //     },
    //   },
    //   terms: [
    //     {
    //       constructorParams: dummyConstructorParams(),
    //       params: [{ params: ['testParam'] }],
    //       result: 'testParam',
    //     },
    //   ],
    // },
});
exports.default = selfContract;
//# sourceMappingURL=subject-constructor-strategy.contract.js.map