import { type ContractTerm } from '#src/types/index';
export type SubjectFromContract = {
    subjectName: string;
    module: any;
};
export interface SubjectStrategy {
    exec: (term: ContractTerm) => any;
    fn: () => any;
}
//# sourceMappingURL=subject-strategy.d.ts.map