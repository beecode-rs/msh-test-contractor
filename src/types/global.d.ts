declare global {
	/**
	 * Example usage: esmImportMocked(import.meta.url, '#src/some-service/some-esm-module')
	 * @param {string | URL} metaUrl first parameter needs to be `import.meta.url`
	 * @param {string} modulePath module path absolute or relative
	 * @returns {any}
	 */
	const esmImportMocked: (metaUrl: string | URL, modulePath: string) => any //eslint-disable-line
}

export {}
