import swaggerJSDoc from 'swagger-jsdoc';
function createOpenapi(title, description, files) {
    return swaggerJSDoc({
        definition: {
            openapi: '3.0.3',
            info: { title, version: '1.0.0', description },
            components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } },
        },
        apis: files,
    });
}
export const backofficeOpenapi = createOpenapi('Bloom Backoffice API', 'APIs used by Bloom administrators and backoffice staff.', ['./src/backoffice-api/**/*.routes.ts', './dist/backoffice-api/**/*.routes.js']);
export const mobileOpenapi = createOpenapi('Bloom Mobile API', 'APIs used by Bloom mobile and end-user applications.', ['./src/mobile-api/**/*.routes.ts', './dist/mobile-api/**/*.routes.js']);
//# sourceMappingURL=openapi.js.map