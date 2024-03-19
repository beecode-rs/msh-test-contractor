import { createRequire } from 'module'

process.env.TZ = 'utc'

/**
 * Example usage: esmImportMocked(import.meta.url, '#src/some-service/some-esm-module')
 * @param {string | URL} metaUrl first parameter needs to be `import.meta.url`
 * @param {string} modulePath module path absolute or relative
 * @returns {any}
 */
// @ts-ignore
//eslint-disable-next-line
global.esmImportMocked = (metaUrl: string | URL, modulePath: string): any => {
	const require = createRequire(metaUrl)

	return require(modulePath)
}
