import { vi } from 'vitest'

import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'
import { mocker } from '#src/mocker/mocker'
import { ContractMockRevertFns } from '#src/types'

const selfContract = contractFactory(
	{ module: global, subjectName: 'Date' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			mock: (options?: { params?: any[] }): ContractMockRevertFns => {
				const realDate = Date.bind(global.Date)

				const mockedDate = new Date((options?.params ?? [])[0] ?? '2020-01-01')
				const _Date = Date
				global.Date = vi.fn(() => mockedDate) as any
				global.Date.UTC = _Date.UTC
				global.Date.parse = _Date.parse
				global.Date.now = _Date.now

				return [
					(): void => {
						global.Date = realDate
					},
				]
			},
			terms: [
				{
					params: [],
					result: new Date('2020-01-01'),
				},
				{
					params: ['2020-01-01'],
					result: new Date('2020-01-01'),
				},
				{
					params: ['2020-01-02'],
					result: new Date('2020-01-02'),
				},
			],
		},
		toISOString: {
			mock: (): ContractMockRevertFns => {
				return [mocker.function(selfContract, SpecialFnName.CONSTRUCTOR).mockRestore]
			},
			terms: [
				{
					constructorParams: [],
					params: [],
					result: '2020-01-01T00:00:00.000Z',
				},
				{
					constructorParams: ['2020-01-02'],
					params: [],
					result: '2020-01-02T00:00:00.000Z',
				},
			],
		},
	}
)

export default selfContract
