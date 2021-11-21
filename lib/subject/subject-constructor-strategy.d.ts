import { ContractTerm } from '../types';
import { SubjectFromContract, SubjectStrategy } from './subject-strategy';
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