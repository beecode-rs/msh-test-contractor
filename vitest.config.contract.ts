import { coverageConfigDefaults, defineConfig } from 'vitest/config'

import { ContractReporter } from '#src/business/component/contractor/contract-reporter.js'
import { contractYamlPlugin } from '#src/vitest-plugin.js'

export default defineConfig({
	plugins: [contractYamlPlugin()],
	resolve: { tsconfigPaths: true },
	test: {
		coverage: {
			exclude: ['lib/**', 'src/index.ts', 'src/**/__fixtures__/**', ...coverageConfigDefaults.exclude],
		},
		exclude: ['src/**/__fixtures__/**'],
		include: ['src/**/*.contract.yaml'],
		mockReset: true,
		passWithNoTests: true,
		reporters: [new ContractReporter()],
		setupFiles: ['./src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
