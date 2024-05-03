import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		coverage: {
			exclude: ['lib/**', ...coverageConfigDefaults.exclude],
			provider: 'istanbul',
		},
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['./src/__tests__/index-jest-setup.ts'],
		watch: false,
	},
})
