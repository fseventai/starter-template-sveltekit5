import { api } from '$lib/server/api';
import type { RequestHandler } from './$types';

/**
 * ElysiaJS catch-all route handler
 * Handles all requests to /api/v1/*
 */
const handler: RequestHandler = ({ request }) => api.handle(request);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
