import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['./src/__tests__/index-jest-setup.ts'],
		watch: false,
	},
})
