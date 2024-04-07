import { SubjectStrategy } from '../subject/subject-strategy.js';
import { AnyContract, ContractTerm } from '../types/index.js';
export declare const subjectService: {
    strategyFromContractFunction: (params: {
        contract: AnyContract;
        fnName: string;
        term: ContractTerm;
    }) => SubjectStrategy;
};
//# sourceMappingURL=subject-service.d.ts.map