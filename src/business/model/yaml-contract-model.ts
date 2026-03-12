export type YamlContractSubjectType = 'function' | 'class'

export type YamlContractTerm = {
	params?: unknown[]
	result?: unknown
	error?: unknown
	constructorParams?: unknown[]
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
