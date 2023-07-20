import sharedConfig from './jest.config.js'

export default {
	...sharedConfig,
	testPathIgnorePatterns: [...sharedConfig.testPathIgnorePatterns, '/__tests__/'],
}
