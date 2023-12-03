export default {
	// collectCoverage: false,
	// collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/**/*.{contract,d}.ts'],
	// coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/__mocks__/', '/__snapshots__/'],
	maxConcurrency: 1,

	moduleFileExtensions: ['js', 'ts'],
	setupFilesAfterEnv: ['jest-extended/all'],
	transform: {},
	preset: 'ts-jest/presets/default-esm',
	moduleNameMapper: {
		'^#$': '<rootDir>/src',
		'^#/(.*)$': ['<rootDir>/src/$1'],
	},
	// roots: ['<rootDir>'],
	clearMocks: true,
	// preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/**/*.(spec|test).[jt]s?(x)'],
	extensionsToTreatAsEsm: ['.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
}
