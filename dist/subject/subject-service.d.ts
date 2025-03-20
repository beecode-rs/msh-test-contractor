import { type SubjectStrategy } from '#src/subject/subject-strategy';
import { type AnyContract, type ContractTerm } from '#src/types/index';
export declare const subjectService: {
    strategyFromContractFunction: (params: {
        contract: AnyContract;
        fnName: string;
        term: ContractTerm;
    }) => SubjectStrategy;
};
//# sourceMappingURL=subject-service.d.ts.map