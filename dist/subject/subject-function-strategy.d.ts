import { SubjectFromContract, SubjectStrategy } from '#src/subject/subject-strategy';
import { ContractTerm } from '#src/types';
export declare class SubjectFunctionStrategy implements SubjectStrategy {
    protected readonly _subjectName: string;
    protected readonly _module: any;
    protected readonly _fnName: string;
    constructor(params: {
        subjectFromContract: SubjectFromContract;
        fnName: string;
    });
    exec(term: ContractTerm): any;
    fn(): any;
}
//# sourceMappingURL=subject-function-strategy.d.ts.map