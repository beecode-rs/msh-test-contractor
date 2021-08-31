import { AnyContract, ContractFnTerm } from '../types/index';
export declare type SubjectFromContract = Pick<AnyContract, 'subjectName' | 'module'>;
export interface SubjectStrategy {
    exec: (term: ContractFnTerm) => any;
    fn: () => any;
}
//# sourceMappingURL=subject-strategy.d.ts.map