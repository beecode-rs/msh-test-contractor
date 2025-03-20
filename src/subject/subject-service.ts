import { SpecialFnName } from '#src/enum/special-fn-name'
import { SubjectClassFunctionStrategy } from '#src/subject/subject-class-function-strategy'
import { SubjectConstructorStrategy } from '#src/subject/subject-constructor-strategy'
import { SubjectFunctionStrategy } from '#src/subject/subject-function-strategy'
import { type SubjectFromContract, type SubjectStrategy } from '#src/subject/subject-strategy'
import { type AnyContract, type ContractTerm } from '#src/types/index'
import { fnUtil } from '#src/util/fn-util'

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
