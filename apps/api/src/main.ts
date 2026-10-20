import './env.js'; // must stay first: loads .env before any module reads process.env
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { initializeDatabase } from './database/database.js';
import { backofficeOpenapi, mobileOpenapi } from './docs/openapi.js';
import { backofficeAuthRouter } from './backoffice-api/auth/auth.routes.js';
import { backofficeUsersRouter } from './backoffice-api/users/users.routes.js';
import { mobileAuthRouter } from './mobile-api/auth/auth.routes.js';
import { mobileUsersRouter } from './mobile-api/users/users.routes.js';

export const app: express.Express = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN ?? 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.get('/backoffice/api/openapi.json', (_req, res) => res.json(backofficeOpenapi));
app.use('/backoffice/api', swaggerUi.serveFiles(backofficeOpenapi), swaggerUi.setup(backofficeOpenapi));
app.get('/mobile/api/openapi.json', (_req, res) => res.json(mobileOpenapi));
app.use('/mobile/api', swaggerUi.serveFiles(mobileOpenapi), swaggerUi.setup(mobileOpenapi));
app.use('/backoffice/auth', backofficeAuthRouter);
app.use('/backoffice/users', backofficeUsersRouter);
app.use('/mobile/auth', mobileAuthRouter);
app.use('/mobile/users', mobileUsersRouter);
// Express 5 forwards async throws here; never leak internals to the client.
app.use((error: { type?: string }, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Request body must be valid JSON.' });
  console.error(error);
  res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' });
});

await initializeDatabase();
if (process.env.NODE_ENV !== 'test') app.listen(port, () => console.log(`Bloom API listening on http://localhost:${port}`));
