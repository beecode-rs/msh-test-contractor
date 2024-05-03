import { SubjectStrategy } from '#src/subject/subject-strategy';
import { AnyContract, ContractTerm } from '#src/types';
export declare const subjectService: {
    strategyFromContractFunction: (params: {
        contract: AnyContract;
        fnName: string;
        term: ContractTerm;
    }) => SubjectStrategy;
};
//# sourceMappingURL=subject-service.d.ts.map