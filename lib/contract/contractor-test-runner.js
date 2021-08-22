"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractorTestRunner = void 0;
const contractor_1 = require("./contractor");
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
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
                const modulePath = path_1.default.join(process.cwd(), file);
                // console.log('contractorTestRunner.dir params:', { location, file, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
                const contract = require(modulePath);
                exports.contractorTestRunner.contract(contract.default);
            });
        });
    },
};
//# sourceMappingURL=contractor-test-runner.js.map