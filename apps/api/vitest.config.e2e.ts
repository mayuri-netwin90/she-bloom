import { existsSync } from 'node:fs';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// Same root .env as the app; NODE_ENV=test stops main.ts from listening on a port.
if (existsSync('../../.env')) process.loadEnvFile('../../.env');
process.env.NODE_ENV = 'test';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
  },
});
