import { ContractTerm } from '../types';
import { SubjectFromContract, SubjectStrategy } from './subject-strategy';
export declare class SubjectFunctionStrategy implements SubjectStrategy {
    protected readonly _subjectName: string;
    protected readonly _module: any;
    protected readonly _fnName: string;
    constructor({ subjectFromContract: { module, subjectName }, fnName, }: {
        subjectFromContract: SubjectFromContract;
        fnName: string;
    });
    exec(term: ContractTerm): any;
    fn(): any;
}
//# sourceMappingURL=subject-function-strategy.d.ts.map