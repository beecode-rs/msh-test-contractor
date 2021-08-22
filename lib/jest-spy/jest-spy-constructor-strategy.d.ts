import { SubjectFromContract } from '../subject/subject-strategy';
import { JestSpyStrategy } from './jest-spy-strategy';
export declare class JestSpyConstructorStrategy implements JestSpyStrategy {
    protected readonly _subjectName: string;
    protected readonly _module: any;
    constructor({ subjectFromContract: { module, subjectName } }: {
        subjectFromContract: SubjectFromContract;
    });
    mockImplementation(): (...args: any[]) => any;
}
//# sourceMappingURL=jest-spy-constructor-strategy.d.ts.map