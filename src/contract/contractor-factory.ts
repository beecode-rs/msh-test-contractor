import { type Contract, type ContractFns, type ContractMock, type PropType } from '#src/types/index.js'

export const contractFactory = <
	TModule,
	TSubjectName extends Extract<keyof TModule, string>,
	TSubject extends PropType<TModule, TSubjectName>,
	TContractFns extends Partial<ContractFns<TSubject>>, // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
>(
	options: { module: TModule; subjectName: TSubjectName; mock?: ContractMock },
	fns: TContractFns
): Contract<TModule, TSubjectName, TSubject> => ({ ...options, fns })
