"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractorService = void 0;
exports.contractorService = {
    testDescription: (params) => {
        const { fnName } = params;
        return `${fnName} [contract]`;
    },
    testName: (params) => {
        const { term: { params: termParams, result }, } = params;
        return `input: ${JSON.stringify(termParams)}   output: ${JSON.stringify(result)}`;
    },
};
//# sourceMappingURL=contractor-service.js.map