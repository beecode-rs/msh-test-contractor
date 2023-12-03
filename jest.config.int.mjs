import sharedConfig from './jest.config.mjs'

export default {
	...sharedConfig,
	testMatch: ['**/__tests__/*.(spec|test).[jt]s?(x)'],
}
