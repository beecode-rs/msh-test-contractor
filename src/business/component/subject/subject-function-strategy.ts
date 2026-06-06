import { SpecialFnName } from '#src/business/model/special-fn-name.js'
import { type SubjectFromContract, type SubjectStrategy } from '#src/business/component/subject/subject-strategy.js'
import { type ContractTerm } from '#src/business/model/contract-model.js'

export class SubjectFunctionStrategy implements SubjectStrategy {
	protected readonly _subjectName: string
	protected readonly _module: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
