import { AnyContract, ContractTerm } from '../types';
export declare type SubjectFromContract = Pick<AnyContract, 'subjectName' | 'module'>;
export interface SubjectStrategy {
    exec: (term: ContractTerm) => any;
    fn: () => any;
}
//# sourceMappingURL=subject-strategy.d.ts.map