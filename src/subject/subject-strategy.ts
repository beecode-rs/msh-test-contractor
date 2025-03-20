import { type ContractTerm } from '#src/types/index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SubjectFromContract = { subjectName: string; module: any }
// export type SubjectFromContract = Pick<AnyContract, 'subjectName' | 'module'>

export interface SubjectStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	exec: (term: ContractTerm) => any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fn: () => any
}
