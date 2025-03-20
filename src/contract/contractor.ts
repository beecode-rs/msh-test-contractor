import { describe, it } from 'vitest'

import { contractorService } from '#src/contract/contractor-service'
import { contractExpectService } from '#src/contract/expect/contract-expect-service'
import { contractMockService } from '#src/contract-mock/contract-mock-service'
import { subjectService } from '#src/subject/subject-service'
import { type Contract, type PropType } from '#src/types/index'

export const contractor = <
	M,
	SN extends Extract<keyof M, string>,
	S extends PropType<M, SN>,
	C extends Contract<M, SN, S>,
	CFNK extends Extract<keyof PropType<C, 'fns'>, string>,
>(
	contract: C,
	fnName: CFNK
): void => {
	const { terms, mock } = contract.fns[fnName]!

	const moduleMockStrategy = contractMockService.strategyFromFunctionMock(contract.mock)
	const functionMockStrategy = contractMockService.strategyFromFunctionMock(mock)

	describe(contractorService.testDescription({ fnName }), () => {
		try {
			terms.forEach((term) => {
				const subjectStrategy = subjectService.strategyFromContractFunction({ contract, fnName, term })

				it(contractorService.testName({ term }), async () => {
					moduleMockStrategy.mock({ params: term.params })
					functionMockStrategy.mock({ params: term.params })
					const expectStrategy = contractExpectService.fromTerm({ term })
					await expectStrategy.test(() => subjectStrategy.exec(term))
					functionMockStrategy.restore()
					moduleMockStrategy.restore()
				})
			})
		} catch (err) {
			console.error(`Error running test on contract:${contract.subjectName}, fn:${fnName}`) // eslint-disable-line no-console
			throw err
		}
	})
}
