import sharedConfig from './jest.config.js'

export default {
	...sharedConfig,
	testMatch: ['**/__tests__/*.(spec|test).[jt]s?(x)'],
}
