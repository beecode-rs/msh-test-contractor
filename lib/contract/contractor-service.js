"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractorService = void 0;
exports.contractorService = {
    testDescription: ({ fnName }) => {
        return `${fnName} [contract]`;
    },
    testName: ({ term: { params, result } }) => {
        return `input: ${JSON.stringify(params)}   output: ${JSON.stringify(result)}`;
    },
};
//# sourceMappingURL=contractor-service.js.map