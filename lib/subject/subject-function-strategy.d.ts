import { type SubjectFromContract, type SubjectStrategy } from '#src/subject/subject-strategy';
import { type ContractTerm } from '#src/types/index';
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