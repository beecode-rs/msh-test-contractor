export default {
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/**/*.{contract,d}.ts'],
	coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/__mocks__/', '/__snapshots__/'],
	maxConcurrency: 1,

	moduleFileExtensions: ['js', 'ts'],
	setupFilesAfterEnv: ['jest-extended/all'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	preset: 'ts-jest/presets/default-esm',
	moduleNameMapper: {
		'#/(.*).js$': '<rootDir>/src/$1',
	},
	roots: ['<rootDir>/src'],
	extensionsToTreatAsEsm: ['.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
}
