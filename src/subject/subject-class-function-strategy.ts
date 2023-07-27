import { SubjectFromContract, SubjectStrategy } from 'src/subject/subject-strategy'
import { ContractTerm } from 'src/types'

export class SubjectClassFunctionStrategy implements SubjectStrategy {
	protected readonly _module: any
	protected readonly _subjectName: string
	protected readonly _constructorParams: any[]
	protected readonly _fnName: string

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

	exec(term: ContractTerm): any {
		const obj = new (this.fn())(...this._constructorParams)
		if (this._isGetter()) {
			return obj[this._fnName]
		}

		return obj[this._fnName](...term.params)
	}

	fn(): any {
		return this._module[this._subjectName]
	}

	protected _isGetter(): boolean {
		return !!Object.getOwnPropertyDescriptor(this._module[this._subjectName].prototype, this._fnName)?.get
	}
}
