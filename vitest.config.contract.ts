import { ContractReporter } from './src/contract/contract-reporter.js'
import { contractYamlPlugin } from './src/vitest-plugin.js'
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths(), contractYamlPlugin()],
	test: {
		coverage: {
			exclude: ['lib/**', 'src/index.ts', 'src/**/__fixtures__/**', ...coverageConfigDefaults.exclude],
		},
		include: ['src/**/*.contract.yaml'],
		exclude: ['src/**/__fixtures__/**'],
		mockReset: true,
		passWithNoTests: true,
		reporters: [new ContractReporter()],
		setupFiles: ['./src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
