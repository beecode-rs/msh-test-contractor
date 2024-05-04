
module.exports = {
	extends: ['@beecode/msh-config/eslint-config'].map(require.resolve),
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
	}
}
