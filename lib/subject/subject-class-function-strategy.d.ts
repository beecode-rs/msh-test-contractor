import { ContractTerm } from '../types';
import { SubjectFromContract, SubjectStrategy } from './subject-strategy';
export declare class SubjectClassFunctionStrategy implements SubjectStrategy {
    protected readonly _module: any;
    protected readonly _subjectName: string;
    protected readonly _constructorParams: any[];
    protected readonly _fnName: string;
    constructor({ subjectFromContract: { module, subjectName }, constructorParams, fnName, }: {
        subjectFromContract: SubjectFromContract;
        constructorParams: any[];
        fnName: string;
    });
    exec(term: ContractTerm): any;
    fn(): any;
}
//# sourceMappingURL=subject-class-function-strategy.d.ts.map