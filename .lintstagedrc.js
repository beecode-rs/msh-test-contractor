module.exports = {
	'**/*.json': ['npm run lint-json'],
	'src/**/*.{ts,tsx,js,jsx}': ['eslint', 'prettier --check'],
}
