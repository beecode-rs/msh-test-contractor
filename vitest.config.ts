import path from 'node:path'

import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'#src': path.resolve(import.meta.dirname, 'src'),
		},
		tsconfigPaths: true,
	},
	test: {
		coverage: {
			exclude: ['src/index.ts', 'src/**/__fixtures__/**', ...coverageConfigDefaults.exclude],
		},
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['./src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
