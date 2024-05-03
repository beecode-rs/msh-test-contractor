import baseDefaultConfig from './vitest.config.js'
import { defineConfig, mergeConfig } from 'vite'

export default mergeConfig(
	baseDefaultConfig,
	defineConfig({
		test: {
			exclude: ['**/__tests__/**'],
			include: ['src/**/*.test.ts'],
		},
	})
)
