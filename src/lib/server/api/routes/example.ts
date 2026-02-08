import { Elysia, t } from 'elysia';

/**
 * Example API routes demonstrating ElysiaJS patterns
 */
export const exampleRoutes = new Elysia({ prefix: '/example' })
    .get('/', () => ({
        message: 'Example API endpoint',
        timestamp: new Date().toISOString()
    }))
    .get(
        '/:id',
        ({ params }) => ({
            id: params.id,
            message: `Fetched item ${params.id}`
        }),
        {
            params: t.Object({
                id: t.String()
            })
        }
    )
    .post(
        '/',
        ({ body }) => ({
            success: true,
            data: body
        }),
        {
            body: t.Object({
                name: t.String(),
                email: t.String({ format: 'email' })
            })
        }
    );
