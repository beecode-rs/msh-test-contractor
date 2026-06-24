import { type ContractTerm } from '#src/business/model/contract-model.js'

const _undefinedReplacer = (_key: string, value: unknown): unknown => {
	if (value === undefined) {
		return '__undefined__'
	}

	return value
}

const _serializeWithUndefined = (value: unknown): string => {
	if (value === undefined) {
		return 'undefined'
	}

	const stringified = JSON.stringify(value, _undefinedReplacer) as string | undefined
	if (!stringified) {
		return 'undefined'
	}

	return stringified.replace(/"__undefined__"/g, 'undefined')
}

export const contractorService = {
	testDescription: (params: { fnName: string }): string => {
		const { fnName } = params

		return `${fnName} [contract]`
	},
	testName: (params: { term: ContractTerm }): string => {
		const {
			term: { params: termParams, result },
		} = params

		const serializedParams = _serializeWithUndefined(termParams)
		const serializedResult = _serializeWithUndefined(result)

		return `input: ${serializedParams}   output: ${serializedResult}`
	},
}
