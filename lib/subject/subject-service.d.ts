import { AnyContract, ContractTerm } from '../types/index';
import { SubjectStrategy } from './subject-strategy';
export declare const subjectService: {
    strategyFromContractFunction: ({ contract: { module, subjectName }, fnName, term: { constructorParams }, }: {
        contract: AnyContract;
        fnName: string;
        term: ContractTerm;
    }) => SubjectStrategy;
};
//# sourceMappingURL=subject-service.d.ts.map