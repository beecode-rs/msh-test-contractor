"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractor = void 0;
const contract_mock_service_1 = require("../contract-mock/contract-mock-service");
const subject_service_1 = require("../subject/subject-service");
const contractor_service_1 = require("./contractor-service");
const contractor = (contract, fnName) => {
    const { terms, mock } = contract.fns[fnName];
    const mockStrategy = contract_mock_service_1.contractMockService.strategyFromFunctionMock(mock);
    describe(contractor_service_1.contractorService.testDescription({ fnName }), () => {
        terms.forEach((term) => {
            const subjectStrategy = subject_service_1.subjectService.strategyFromContractFunction({ contract, fnName, term });
            it(contractor_service_1.contractorService.testName({ term }), () => {
                mockStrategy.mock({ params: term.params });
                // TODO create strategy for checking the result (error, equal)
                // TODO create wrapper if function returns promise
                const result = subjectStrategy.exec(term);
                if (term.returnFnParams) {
                    expect(result(...term.returnFnParams)).toEqual(term.result);
                }
                else {
                    expect(result).toEqual(term.result);
                }
                mockStrategy.restore();
            });
        });
    });
};
exports.contractor = contractor;
//# sourceMappingURL=contractor.js.map