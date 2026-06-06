import type { Plugin } from 'vite'

export const contractYamlPlugin = (): Plugin => ({
	name: 'vitest-plugin-contract-yaml',
	transform(_code: string, id: string) {
		if (!id.endsWith('.contract.yaml')) {return null}

		const escapedPath = id.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

		return {
			code: `import { contractorTestRunner } from '@beecode/msh-test-contractor/business/component/contractor/contractor-test-runner'
await contractorTestRunner.file('${escapedPath}')`,
			map: null,
		}
	},
})
