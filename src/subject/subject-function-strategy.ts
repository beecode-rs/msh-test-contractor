import { SpecialFnName } from '#/enum/special-fn-name.js'
import { SubjectFromContract, SubjectStrategy } from '#/subject/subject-strategy.js'
import { ContractTerm } from '#/types/index.js'

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
