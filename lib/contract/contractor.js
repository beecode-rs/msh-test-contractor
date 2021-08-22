"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractor = void 0;
const mock_service_1 = require("../contract-mock/mock-service");
const subject_service_1 = require("../subject/subject-service");
const contractor_service_1 = require("./contractor-service");
const contractor = (contract, fnName) => {
    const { terms, mock } = contract.fns[fnName];
    const mockStrategy = mock_service_1.mockService.strategyFromFunctionMock(mock);
    describe(contractor_service_1.contractorService.testDescription({ fnName }), () => {
        terms.forEach((term) => {
            const subjectStrategy = subject_service_1.subjectService.strategyFromContract({ contract, fnName, term });
            it(contractor_service_1.contractorService.testName({ term }), () => {
                mockStrategy.mock({ params: term.params });
                expect(subjectStrategy.exec(term)).toEqual(term.result);
                mockStrategy.restore();
            });
        });
    });
};
exports.contractor = contractor;
//# sourceMappingURL=contractor.js.map