import { Elysia } from 'elysia';
import { exampleRoutes } from './routes/example';

/**
 * Main ElysiaJS API application
 * All routes are prefixed with /api/v1
 */
export const api = new Elysia({ prefix: '/api/v1' })
    .get('/', () => ({
        message: 'Hello from ElysiaJS API',
        version: '1.0.0'
    }))
    .use(exampleRoutes);

export type Api = typeof api;
