import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	clearMocks: true,
	maxConcurrency: 1,
	moduleNameMapper: {
		'^#src$': '<rootDir>/src',
		'^#src/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest/presets/default-esm',
	setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/src/index-jest-setup.ts'],
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/**/*.(spec|test).[jt]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {},
}

export default jestConfig
