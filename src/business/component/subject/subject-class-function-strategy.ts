import { type SubjectFromContract, type SubjectStrategy } from '#src/business/component/subject/subject-strategy.js'
import { type ContractTerm } from '#src/business/model/contract-model.js'

export class SubjectClassFunctionStrategy implements SubjectStrategy {
	protected readonly _module: any // eslint-disable-line @typescript-eslint/no-explicit-any
	protected readonly _subjectName: string
	protected readonly _constructorParams: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
	protected readonly _fnName: string

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(params: { subjectFromContract: SubjectFromContract; constructorParams: any[]; fnName: string }) {
		const {
			subjectFromContract: { module, subjectName },
			constructorParams,
			fnName,
		} = params
		this._module = module
		if (!subjectName) {
			throw new Error('Subject name must be specified for class functions strategy')
		}
		this._subjectName = subjectName
		this._constructorParams = constructorParams
		this._fnName = fnName
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	exec(term: ContractTerm): any {
		const obj = new (this.fn())(...this._constructorParams)
		if (this._isGetter()) {
			return obj[this._fnName]
		}

		return obj[this._fnName](...term.params)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fn(): any {
		return this._module[this._subjectName]
	}

	protected _isGetter(): boolean {
		return !!Object.getOwnPropertyDescriptor(this._module[this._subjectName].prototype, this._fnName)?.get
	}
}
