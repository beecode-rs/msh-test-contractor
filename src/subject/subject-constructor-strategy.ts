import { SubjectFromContract, SubjectStrategy } from '#/subject/subject-strategy.js'
import { ContractTerm } from '#/types/index.js'

export class SubjectConstructorStrategy implements SubjectStrategy {
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

	exec(term: ContractTerm): any {
		return new (this.fn())(...term.params)
	}

	fn(): any {
		return this._module[this._subjectName]
	}
}
