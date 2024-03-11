export default {
	maxConcurrency: 1,

	moduleFileExtensions: ['js', 'ts'],
	setupFilesAfterEnv: ['jest-extended/all'],
	transform: {},
	preset: 'ts-jest/presets/default-esm',
	// roots: ['<rootDir>'],
	clearMocks: true,
	// preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/**/*.(spec|test).[jt]s?(x)'],
	extensionsToTreatAsEsm: ['.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
}
