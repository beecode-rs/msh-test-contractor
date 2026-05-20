import { vi } from 'vitest'

import type { ContractMockRevertFns } from '#src/types/index.js'

export default function fixedDateMock(options?: { params?: unknown[] }): ContractMockRevertFns {
	const realDate = Date.bind(global.Date)

	const dateArg = (options?.params ?? [])[0] as string | undefined
	const mockedDate = new Date(dateArg ?? '2020-01-01')
	const _Date = Date
	// eslint-disable-next-line prefer-arrow-callback
	global.Date = vi.fn(function () {
		return mockedDate
	}) as unknown as typeof Date
	global.Date.UTC = _Date.UTC
	global.Date.parse = _Date.parse
	global.Date.now = _Date.now

	return [
		(): void => {
			global.Date = realDate
		},
	]
}
