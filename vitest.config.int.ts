import { defineConfig, mergeConfig } from 'vite'

import baseDefaultConfig from './vitest.config.js'

export default mergeConfig(
	baseDefaultConfig,
	defineConfig({
		test: {
			include: ['src/**/__tests__/*.test.ts'],
		},
	})
)
