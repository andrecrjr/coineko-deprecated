import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';

// https://vitejs.dev/config/
const viteConfig = {
	plugins: [svgr(), react(), tsconfigPaths()]
};

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			globals: true,
			environment: 'jsdom'
		}
	})
);
