import { SpecialFnName } from '#/enum/special-fn-name.js'
import { SubjectClassFunctionStrategy } from '#/subject/subject-class-function-strategy.js'
import { SubjectConstructorStrategy } from '#/subject/subject-constructor-strategy.js'
import { SubjectFunctionStrategy } from '#/subject/subject-function-strategy.js'
import { SubjectFromContract, SubjectStrategy } from '#/subject/subject-strategy.js'
import { AnyContract, ContractTerm } from '#/types/index.js'
import { fnUtil } from '#/util/fn-util.js'

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
		if (Object.keys(fns ?? {}).includes(SpecialFnName.CONSTRUCTOR)) {
			if (!constructorParams) {
				throw new Error(`Missing constructorParams in contract: ${subjectName}.${fnName}`)
			}

			return new SubjectClassFunctionStrategy({ constructorParams, fnName, subjectFromContract })
		}

		return new SubjectFunctionStrategy({ fnName, subjectFromContract })
	},
}
