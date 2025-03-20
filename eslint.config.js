import eslintNode from '@beecode/msh-config/src/eslint-config.mjs'

export default [
	{
		ignores: [
			'.base-frame-tmp',
			'.idea',
			'.semaphore',
			'coverage',
			'dist',
			'lib',
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
			'babel.config.cjs',
			'release.config.cjs',
		],
	},
	...eslintNode,
]
