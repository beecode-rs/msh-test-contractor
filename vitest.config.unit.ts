import { defineConfig, mergeConfig } from 'vite'

import baseDefaultConfig from './vitest.config.js'

export default mergeConfig(
	baseDefaultConfig,
	defineConfig({
		test: {
			exclude: ['**/__tests__/**'],
			include: ['src/**/*.test.ts'],
		},
	})
)
