import { type Contract, type ContractFns, type ContractMock, type PropType } from '#src/types/index.js'

export const contractFactory = <
	M,
	SN extends Extract<keyof M, string>,
	S extends PropType<M, SN>,
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	CFNS extends Partial<ContractFns<S>>,
>(
	options: { module: M; subjectName: SN; mock?: ContractMock },
	fns: CFNS
): Contract<M, SN, S> => ({ ...options, fns })
