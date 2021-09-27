"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractor = void 0;
const contract_mock_service_1 = require("../contract-mock/contract-mock-service");
const subject_service_1 = require("../subject/subject-service");
const contractor_service_1 = require("./contractor-service");
const contract_expect_service_1 = require("./expect/contract-expect-service");
const contractor = (contract, fnName) => {
    const { terms, mock } = contract.fns[fnName];
    const moduleMockStrategy = contract_mock_service_1.contractMockService.strategyFromFunctionMock(contract.mock);
    const functionMockStrategy = contract_mock_service_1.contractMockService.strategyFromFunctionMock(mock);
    describe(contractor_service_1.contractorService.testDescription({ fnName }), () => {
        try {
            terms.forEach((term) => {
                const subjectStrategy = subject_service_1.subjectService.strategyFromContractFunction({ contract, fnName, term });
                it(contractor_service_1.contractorService.testName({ term }), async () => {
                    moduleMockStrategy.mock({ params: term.params });
                    functionMockStrategy.mock({ params: term.params });
                    const expectStrategy = contract_expect_service_1.contractExpectService.fromTerm({ term });
                    await expectStrategy.test(() => subjectStrategy.exec(term));
                    functionMockStrategy.restore();
                    moduleMockStrategy.restore();
                });
            });
        }
        catch (err) {
            console.error(`Error running test on contract:${contract.subjectName}, fn:${fnName}`); // eslint-disable-line no-console
            throw err;
        }
    });
};
exports.contractor = contractor;
//# sourceMappingURL=contractor.js.map