import { type ContractTerm } from '#src/business/model/contract-model.js'

export type SubjectFromContract = { subjectName: string; module: any } // eslint-disable-line @typescript-eslint/no-explicit-any
// export type SubjectFromContract = Pick<AnyContract, 'subjectName' | 'module'>

export interface SubjectStrategy {
	exec: (term: ContractTerm) => any // eslint-disable-line @typescript-eslint/no-explicit-any
	fn: () => any // eslint-disable-line @typescript-eslint/no-explicit-any
}
