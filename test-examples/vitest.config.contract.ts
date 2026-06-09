import { ContractReporter } from '@beecode/msh-test-contractor/contract-reporter'
import { contractYamlPlugin } from '@beecode/msh-test-contractor/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [contractYamlPlugin()],
	resolve: { tsconfigPaths: true },
	test: {
		include: ['**/*.contract.yaml'],
		mockReset: true,
		passWithNoTests: true,
		reporters: [new ContractReporter()],
		setupFiles: [new URL('./index-vitest-setup.ts', import.meta.url).pathname],
		watch: false,
	},
})
