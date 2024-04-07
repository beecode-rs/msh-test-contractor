import { expect } from '@jest/globals'

expect.extend((await import('jest-extended')).default)

declare module '@jest/expect' {
	export interface Matchers<R extends void | Promise<void>> extends CustomMatchers<R> {}
}

process.env.TZ = 'utc'
