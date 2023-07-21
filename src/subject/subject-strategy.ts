import { ContractTerm } from '#/types/index.js'

export type SubjectFromContract = { subjectName: string; module: any }
// export type SubjectFromContract = Pick<AnyContract, 'subjectName' | 'module'>

export interface SubjectStrategy {
	exec: (term: ContractTerm) => any
	fn: () => any
}
