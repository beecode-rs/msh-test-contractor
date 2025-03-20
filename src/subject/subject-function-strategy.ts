import { SpecialFnName } from '#src/enum/special-fn-name'
import { type SubjectFromContract, type SubjectStrategy } from '#src/subject/subject-strategy'
import { type ContractTerm } from '#src/types/index'

export class SubjectFunctionStrategy implements SubjectStrategy {
	protected readonly _subjectName: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	exec(term: ContractTerm): any {
		const func = this.fn()

		return func(...term.params)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fn(): any {
		if (this._fnName === SpecialFnName.SELF) {
			return this._module[this._subjectName]
		}

		return this._module[this._subjectName][this._fnName]
	}
}
