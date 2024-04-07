// @ts-expect-error
import sharedConfig from './jest.config'
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	...sharedConfig,
	testPathIgnorePatterns: [...(sharedConfig.testPathIgnorePatterns ?? []), '/__tests__/'],
}

export default jestConfig
