// @ts-expect-error
import sharedConfig from './jest.config.ts'
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	...sharedConfig,
	testMatch: ['**/__tests__/*.(spec|test).[jt]s?(x)'],
}

export default jestConfig
