"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractorTestRunner = void 0;
const contractor_1 = require("./contractor");
const glob_1 = require("glob");
exports.contractorTestRunner = {
    contract: (contract) => {
        describe(contract.subjectName, () => {
            Object.keys(contract.fns).forEach((fnName) => {
                contractor_1.contractor(contract, fnName);
            });
        });
    },
    dir: (location) => {
        describe(location, () => {
            glob_1.glob.sync(`${location}/**/*.contract.ts`).forEach((file) => {
                const contract = require(file.slice(2, -3));
                exports.contractorTestRunner.contract(contract.default);
            });
        });
    },
};
//# sourceMappingURL=contractor-test-runner.js.map