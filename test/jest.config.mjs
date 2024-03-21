export default {
	maxConcurrency: 1,

	setupFilesAfterEnv: ['jest-extended/all'],
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	preset: 'ts-jest/presets/default-esm',
	// roots: ['<rootDir>'],
	clearMocks: true,
	// preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/**/*.(spec|test).[jt]s?(x)'],
	extensionsToTreatAsEsm: ['.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
}
