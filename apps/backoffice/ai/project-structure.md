# Project Structure

This project is a Monorepo utilizing pnpm workspaces and Turborepo. The backend is built with NestJS, and the frontend backoffice is built with React, Vite, and Mantine v8.

Project folders:

bloom-platform/
├── apps/
│   ├── api/                     # Backend API application
│   │   ├── ai/                  # Backend-specific AI context (NestJS rules, DB schema)
│   │   ├── src/                 # NestJS source code
│   │   └── package.json
│   │
│   └── backoffice/              # Frontend administrative application
│       ├── ai/                  # Frontend-specific AI context (Mantine rules, Figma tokens, Func Analysis)
│       ├── src/                 # React components, theme, and pages
│       └── package.json
│
├── packages/
│   ├── api-client/              # Shared typed API clients
│   └── config/                  # Shared workspace configs (ESLint, Prettier, TypeScript)
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json

Important Notes:

- The project uses a Monorepo structure managed by `pnpm` and built with `Turborepo`.
- Backend logic is handled inside `apps/api` using NestJS.
- Frontend UI is inside `apps/backoffice` using React, Vite, and Mantine v8 (no Tailwind).
- Shared code and configurations live inside the `packages/` directory.
- AI prompts, rules, and design tokens are scoped to their specific domains (frontend context is strictly in `apps/backoffice/ai/`, and backend context is in `apps/api/ai/`).