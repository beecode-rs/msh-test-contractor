import { SpecialFnName } from '#src/enum/special-fn-name.js'
import { SubjectClassFunctionStrategy } from '#src/subject/subject-class-function-strategy.js'
import { SubjectConstructorStrategy } from '#src/subject/subject-constructor-strategy.js'
import { SubjectFunctionStrategy } from '#src/subject/subject-function-strategy.js'
import { type SubjectFromContract, type SubjectStrategy } from '#src/subject/subject-strategy.js'
import { type AnyContract, type ContractTerm } from '#src/types/index.js'
import { fnUtil } from '#src/util/fn-util.js'

export const subjectService = {
	strategyFromContractFunction: (params: { contract: AnyContract; fnName: string; term: ContractTerm }): SubjectStrategy => {
		const {
			contract: { module, subjectName, fns },
			fnName,
			term: { constructorParams },
		} = params
		const subjectFromContract = { module, subjectName } as SubjectFromContract
		if (fnUtil.isConstructor(fnName)) {
			return new SubjectConstructorStrategy({ subjectFromContract })
		}
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Object.keys(fns ?? {}).includes(SpecialFnName.CONSTRUCTOR)) {
			if (!constructorParams) {
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				throw new Error(`Missing constructorParams in contract: ${subjectName}.${fnName}`)
			}

			return new SubjectClassFunctionStrategy({ constructorParams, fnName, subjectFromContract })
		}

		return new SubjectFunctionStrategy({ fnName, subjectFromContract })
	},
}
