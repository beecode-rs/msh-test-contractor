"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractFactory = void 0;
const contractFactory = (module, subjectNameOrFns, fns) => (Object.assign({ module }, (fns
    ? {
        subjectName: subjectNameOrFns,
        fns: fns,
    }
    : { fns: subjectNameOrFns })));
exports.contractFactory = contractFactory;
//# sourceMappingURL=contractor-factory.js.map