import { AnyContract, ContractFnTerm } from '../types';
import { SubjectStrategy } from './subject-strategy';
export declare const subjectService: {
    strategyFromContractFunction: ({ contract: { module, subjectName }, fnName, term: { constructorParams }, }: {
        contract: AnyContract;
        fnName: string;
        term: ContractFnTerm;
    }) => SubjectStrategy;
};
//# sourceMappingURL=subject-service.d.ts.map