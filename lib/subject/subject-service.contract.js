"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contractor_factory_1 = require("../contract/contractor-factory");
const mocker_1 = require("../mocker/mocker");
const subject_class_function_strategy_contract_1 = __importDefault(require("./subject-class-function-strategy.contract"));
const subject_constructor_strategy_contract_1 = __importDefault(require("./subject-constructor-strategy.contract"));
const subject_function_strategy_contract_1 = __importDefault(require("./subject-function-strategy.contract"));
class DummyClass {
    a(_a) {
        return _a;
    }
}
const dummyContract = {
    module: { DummyClass },
    subjectName: 'DummyClass',
};
exports.default = contractor_factory_1.contractFactory(require('./subject-service'), 'subjectService', {
    strategyFromContractFunction: {
        terms: [
            {
                mock: {
                    jest: (_jest) => {
                        return [mocker_1.mocker.contract(subject_constructor_strategy_contract_1.default)];
                    },
                },
                params: [{ contract: dummyContract, fnName: '_constructor', term: {} }],
                result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName },
            },
            {
                mock: {
                    jest: (_jest) => {
                        return [mocker_1.mocker.contract(subject_class_function_strategy_contract_1.default)];
                    },
                },
                params: [{ contract: dummyContract, fnName: 'a', term: { constructorParams: [] } }],
                result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName, _constructorParams: [], _fnName: 'a' },
            },
            {
                mock: {
                    jest: (_jest) => {
                        return [mocker_1.mocker.contract(subject_function_strategy_contract_1.default)];
                    },
                },
                params: [{ contract: dummyContract, fnName: 'a', term: {} }],
                result: { _module: dummyContract.module, _subjectName: dummyContract.subjectName, _fnName: 'a' },
            },
        ],
    },
});
//# sourceMappingURL=subject-service.contract.js.map