import baseDefaultConfig from './vitest.config.js'
import { defineConfig, mergeConfig } from 'vite'

export default mergeConfig(
	baseDefaultConfig,
	defineConfig({
		test: {
			include: ['src/**/__tests__/*.test.ts'],
		},
	})
)
