import eslintNode from '@beecode/msh-config/eslint-config'

export default [
	{
		ignores: [
			'.base-frame-template',
			'.idea',
			'.semaphore',
			'coverage',
			'dist',
			'node_modules',
			'resource',
			'packages',
			'.*.js',
			'.*.json',
			'package-lock.json',
			'tsconfig*.json',
			'typedoc.json',
			'jest.config*.ts',
			'eslint.config.js',
			'release.config.cjs',
			'.history',
		],
	},
	...eslintNode,
]
