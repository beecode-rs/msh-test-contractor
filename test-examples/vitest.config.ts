import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		mockReset: true,
		passWithNoTests: true,
		setupFiles: [new URL('./index-vitest-setup.ts', import.meta.url).pathname],
		watch: false,
	},
})
