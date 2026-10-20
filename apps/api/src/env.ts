import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Loads the repo-root .env regardless of how/where the API is started (src/ or dist/ are both two levels down).
// Variables already set in the environment win.
const envFile = fileURLToPath(new URL('../../../.env', import.meta.url));
if (existsSync(envFile)) process.loadEnvFile(envFile);

if (!process.env.DATABASE_URL) throw new Error(`DATABASE_URL is not set. Add it to ${envFile}.`);
