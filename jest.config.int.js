// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharedConfig = require('./jest.config.js')

module.exports = {
	...sharedConfig,
	testMatch: ['**/__tests__/*.(spec|test).[jt]s?(x)'],
}
