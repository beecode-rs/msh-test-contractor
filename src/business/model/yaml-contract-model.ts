export type YamlContractSubjectType = 'function' | 'class'

export type YamlContractTerm = {
	params?: unknown[]
	result?: unknown
	error?: unknown
	constructorParams?: unknown[]
	returnFnParams?: unknown[]
}

export type YamlContractFunction = {
	terms: YamlContractTerm[]
}

export type YamlContractModel = {
	subjectName: string
	subjectType: YamlContractSubjectType
	module: string
	fns: Record<string, YamlContractFunction>
}

export class YamlContractModelValidator {
	protected readonly _validateTermArrayField = (params: {
		fieldName: string
		term: Record<string, unknown>
	}): void => {
		if (params.fieldName in params.term && !Array.isArray(params.term[params.fieldName])) {
			throw new Error(`YamlContractTerm.${params.fieldName} must be an array`)
		}
	}

	protected readonly _validateTermHasResultOrError = (params: { term: Record<string, unknown> }): void => {
		if (!('result' in params.term) && !('error' in params.term)) {
			throw new Error('YamlContractTerm must have either "result" or "error" field')
		}
	}

	isYamlContractTerm(value: unknown): value is YamlContractTerm {
		if (typeof value !== 'object' || value === null) {
			throw new Error('YamlContractTerm must be a non-null object')
		}

		const term = value as Record<string, unknown>

		this._validateTermArrayField({ fieldName: 'params', term })
		this._validateTermHasResultOrError({ term })
		this._validateTermArrayField({ fieldName: 'constructorParams', term })
		this._validateTermArrayField({ fieldName: 'returnFnParams', term })

		return true
	}

	protected readonly _validateTermsArray = (params: { fn: Record<string, unknown> }): void => {
		if (!('terms' in params.fn)) {
			throw new Error('YamlContractFunction must have a "terms" field')
		}

		if (!Array.isArray(params.fn.terms)) {
			throw new Error('YamlContractFunction.terms must be an array')
		}
	}

	protected readonly _validateEachTerm = (params: { terms: unknown[] }): void => {
		params.terms.forEach((term, index) => {
			try {
				this.isYamlContractTerm(term)
			} catch (e) {
				let message: string
				if (e instanceof Error) {
					message = e.message
				} else {
					message = String(e)
				}
				throw new Error(`YamlContractFunction.terms[${String(index)}] is invalid: ${message}`)
			}
		})
	}

	isYamlContractFunction(value: unknown): value is YamlContractFunction {
		if (typeof value !== 'object' || value === null) {
			throw new Error('YamlContractFunction must be a non-null object')
		}

		const fn = value as Record<string, unknown>

		this._validateTermsArray({ fn })
		this._validateEachTerm({ terms: fn.terms as unknown[] })

		return true
	}

	protected readonly _validateNonEmptyStringField = (params: {
		fieldName: string
		model: Record<string, unknown>
	}): void => {
		if (!(params.fieldName in params.model)) {
			throw new Error(`YamlContractModel must have a "${params.fieldName}" field`)
		}
		if (typeof params.model[params.fieldName] !== 'string') {
			throw new Error(`YamlContractModel.${params.fieldName} must be a string`)
		}
		if ((params.model[params.fieldName] as string).trim() === '') {
			throw new Error(`YamlContractModel.${params.fieldName} must be a non-empty string`)
		}
	}

	protected readonly _validateSubjectTypeField = (params: { model: Record<string, unknown> }): void => {
		if (!('subjectType' in params.model)) {
			throw new Error('YamlContractModel must have a "subjectType" field')
		}
		if (params.model.subjectType !== 'function' && params.model.subjectType !== 'class') {
			throw new Error('YamlContractModel.subjectType must be "function" or "class"')
		}
	}

	protected readonly _validateFnsField = (params: { model: Record<string, unknown> }): Record<string, unknown> => {
		if (!('fns' in params.model)) {
			throw new Error('YamlContractModel must have a "fns" field')
		}
		if (typeof params.model.fns !== 'object' || params.model.fns === null) {
			throw new Error('YamlContractModel.fns must be an object')
		}

		return params.model.fns as Record<string, unknown>
	}

	protected readonly _validateEachFunction = (params: { fns: Record<string, unknown> }): void => {
		Object.entries(params.fns).forEach(([key, fn]) => {
			try {
				this.isYamlContractFunction(fn)
			} catch (e) {
				let message: string
				if (e instanceof Error) {
					message = e.message
				} else {
					message = String(e)
				}
				throw new Error(`YamlContractModel.fns["${key}"] is invalid: ${message}`)
			}
		})
	}

	isYamlContractModel(value: unknown): value is YamlContractModel {
		if (typeof value !== 'object' || value === null) {
			throw new Error('YamlContractModel must be a non-null object')
		}

		const model = value as Record<string, unknown>

		this._validateNonEmptyStringField({ fieldName: 'subjectName', model })
		this._validateSubjectTypeField({ model })
		this._validateNonEmptyStringField({ fieldName: 'module', model })
		const fns = this._validateFnsField({ model })
		this._validateEachFunction({ fns })

		return true
	}
}
