# API Folder Structure

This API is organized into two main sections to separate concerns between different client applications.

## Directory Layout

```
src/
├── backoffice-api/    # Backoffice API modules
│   └── auth/          # Authentication for administrators
│       ├── auth.controller.ts
│       ├── auth.routes.ts
│       └── auth.service.ts
├── mobile-api/        # Mobile/Frontend API modules
│   └── auth/          # Authentication for end-users/mobile
│       ├── auth.controller.ts
│       ├── auth.routes.ts
│       └── auth.service.ts
├── database/          # Database configuration and initialization
├── docs/              # OpenAPI/Swagger documentation
└── main.ts            # Application entry point
```

## Module Structure Convention

Each API module (e.g., auth, users, products) should follow this pattern:

### For Backoffice APIs (`/backoffice-api/{module}/`)
- **Purpose**: APIs used by Bloom administrators and backoffice staff
- **Route prefix**: `/backoffice/{module}`
- **Swagger docs**: Available at `/backoffice/api`

### For Mobile/Frontend APIs (`/mobile-api/{module}/`)
- **Purpose**: APIs used by Bloom mobile and end-user applications
- **Route prefix**: `/mobile/{module}`
- **Swagger docs**: Available at `/mobile/api`

### Module Files
Each module should contain:
- `{module}.controller.ts` - Request handlers
- `{module}.routes.ts` - Route definitions with Swagger annotations
- `{module}.service.ts` - Business logic

## Adding New Modules

When adding a new module:

1. Create the appropriate folder:
   - `/backoffice-api/{module}/` for backoffice features
   - `/mobile-api/{module}/` for mobile/frontend features

2. Add the three required files (controller, routes, service)

3. Import and register the router in `main.ts`:
   ```typescript
   import { backoffice{Module}Router } from './backoffice-api/{module}/{module}.routes.js';
   app.use('/backoffice/{module}', backoffice{Module}Router);
   ```

4. Update the OpenAPI configuration in `docs/openapi.ts` if needed (files are auto-discovered via glob patterns)

## Swagger/OpenAPI Documentation

The API uses Swagger UI for interactive API documentation.

### Accessing Swagger UI

- **Backoffice API**: http://localhost:3000/backoffice/api
- **Mobile API**: http://localhost:3000/mobile/api
- **OpenAPI JSON**: http://localhost:3000/backoffice/api/openapi.json or http://localhost:3000/mobile/api/openapi.json

### Adding Swagger Annotations

Swagger annotations are added as JSDoc comments in route files:

```typescript
/**
 * @openapi
 * /backoffice/users:
 *   get:
 *     tags: [Users]
 *     summary: List all backoffice users
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of backoffice users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   email: { type: string }
 *       401: { description: Missing, invalid, or expired token }
 */
```

### Authentication in Swagger UI

To test protected endpoints in Swagger UI:

1. Click the **Authorize** button (🔒 icon) at the top right
2. Enter your JWT token (without "Bearer" prefix)
3. Click **Authorize**
4. All subsequent requests will include the token

### Configuration

Swagger is configured in `docs/openapi.ts`:
- Separate OpenAPI specs for backoffice and mobile APIs
- Auto-discovers route files via glob patterns
- Includes JWT Bearer authentication scheme
- Generates documentation from JSDoc comments
