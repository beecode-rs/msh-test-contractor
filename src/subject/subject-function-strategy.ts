import { SpecialFnName } from '#src/enum/special-fn-name'
import { SubjectFromContract, SubjectStrategy } from '#src/subject/subject-strategy'
import { ContractTerm } from '#src/types'

export class SubjectFunctionStrategy implements SubjectStrategy {
	protected readonly _subjectName: string
	protected readonly _module: any
	protected readonly _fnName: string

	constructor(params: { subjectFromContract: SubjectFromContract; fnName: string }) {
		const {
			subjectFromContract: { module, subjectName },
			fnName,
		} = params
		this._subjectName = subjectName
		this._module = module
		this._fnName = fnName
	}

	exec(term: ContractTerm): any {
		const func = this.fn()

		return func(...term.params)
	}

	fn(): any {
		return this._fnName === SpecialFnName.SELF ? this._module[this._subjectName] : this._module[this._subjectName][this._fnName]
	}
}
