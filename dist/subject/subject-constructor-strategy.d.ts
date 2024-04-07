import { SubjectFromContract, SubjectStrategy } from '../subject/subject-strategy.js';
import { ContractTerm } from '../types/index.js';
export declare class SubjectConstructorStrategy implements SubjectStrategy {
    protected readonly _module: any;
    protected readonly _subjectName: string;
    constructor(params: {
        subjectFromContract: SubjectFromContract;
    });
    exec(term: ContractTerm): any;
    fn(): any;
}
//# sourceMappingURL=subject-constructor-strategy.d.ts.map