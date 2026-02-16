import { type SubjectFromContract, type SubjectStrategy } from '#src/subject/subject-strategy.js'
import { type ContractTerm } from '#src/types/index.js'

export class SubjectConstructorStrategy implements SubjectStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected readonly _module: any
	protected readonly _subjectName: string

	constructor(params: { subjectFromContract: SubjectFromContract }) {
		const {
			subjectFromContract: { module, subjectName },
		} = params
		if (!subjectName) {
			throw new Error('Subject name must be specified for class functions strategy')
		}
		this._module = module
		this._subjectName = subjectName
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	exec(term: ContractTerm): any {
		return new (this.fn())(...term.params)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fn(): any {
		return this._module[this._subjectName]
	}
}
