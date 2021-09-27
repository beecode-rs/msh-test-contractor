import { AnyContract, ContractTerm } from '../types';
import { SubjectStrategy } from './subject-strategy';
export declare const subjectService: {
    strategyFromContractFunction: ({ contract: { module, subjectName, fns }, fnName, term: { constructorParams }, }: {
        contract: AnyContract;
        fnName: string;
        term: ContractTerm;
    }) => SubjectStrategy;
};
//# sourceMappingURL=subject-service.d.ts.map