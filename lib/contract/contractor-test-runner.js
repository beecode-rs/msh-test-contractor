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
    dir: (dirLocation) => {
        describe(dirLocation, () => glob_1.glob.sync(`${dirLocation}/**/*.contract.ts`).forEach(exports.contractorTestRunner._file));
    },
    file: (fileLocation) => {
        describe(fileLocation, () => exports.contractorTestRunner._file(fileLocation));
    },
    _file: (fileLocation) => {
        const modulePath = path_1.default.join(process.cwd(), fileLocation);
        // console.log('contractorTestRunner.dir params:', { fileLocation, modulePath, cwd: process.cwd(), __dirname }) // eslint-disable-line no-console
        const contract = require(modulePath);
        exports.contractorTestRunner.contract(contract.default);
    },
};
//# sourceMappingURL=contractor-test-runner.js.map