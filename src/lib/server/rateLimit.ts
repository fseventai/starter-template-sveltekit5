/**
 * Simple in-memory rate limiter for API protection.
 * Note: This works per-server instance. For production with multiple instances,
 * consider using Redis-based rate limiting.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically (every 5 minutes)
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
    /** Maximum number of requests allowed in the window */
    maxRequests: number;
    /** Time window in milliseconds */
    windowMs: number;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetIn: number; // milliseconds until reset
}

/**
 * Check if the request is within rate limits.
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit check result
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = { maxRequests: 5, windowMs: 60 * 60 * 1000 } // 5 requests per hour
): RateLimitResult {
    const now = Date.now();
    const key = `ratelimit:${identifier}`;

    let entry = rateLimitStore.get(key);

    // Create new entry if doesn't exist or window has expired
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(key, entry);

    const remaining = Math.max(0, config.maxRequests - entry.count);
    const resetIn = entry.resetTime - now;

    return {
        success: entry.count <= config.maxRequests,
        remaining,
        resetIn,
    };
}

/**
 * Get client IP from request, considering proxies.
 */
export function getClientIP(request: Request): string {
    // Check common proxy headers
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback (this won't work in production but needed for development)
    return 'unknown';
}

/**
 * Validate honeypot field - should be empty if submitted by human.
 * Bots typically fill all fields including hidden ones.
 */
export function validateHoneypot(value: string | undefined | null): boolean {
    return !value || value.trim() === '';
}

/**
 * Basic input sanitization - removes potential XSS vectors.
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}

/**
 * Validate that the request isn't suspiciously fast (bot behavior).
 * Humans typically take at least a few seconds to fill a form.
 * @param submissionTime - Timestamp when form was loaded
 * @param minTimeMs - Minimum time in ms (default 3 seconds)
 */
export function validateSubmissionTime(
    submissionTime: number | undefined,
    minTimeMs: number = 3000
): boolean {
    if (!submissionTime) return true; // Be lenient if not provided
    const elapsed = Date.now() - submissionTime;
    return elapsed >= minTimeMs;
}

/**
 * Check for spam patterns in content.
 */
export function detectSpamPatterns(text: string): boolean {
    const spamPatterns = [
        /\[url=/i,           // BBCode links
        /https?:\/\/[^\s]+/gi, // Multiple URLs (check count)
        /<a\s+href/i,        // HTML links
        /viagra|casino|lottery|winner|congratulations.*won/i, // Common spam words
    ];

    // Check for excessive URLs (more than 3)
    const urlMatches = text.match(/https?:\/\/[^\s]+/gi);
    if (urlMatches && urlMatches.length > 3) {
        return true;
    }

    // Check for spam patterns
    return spamPatterns.some(pattern => pattern.test(text));
}

/**
 * Validate content length to prevent abuse.
 */
export function validateContentLength(
    text: string,
    maxLength: number = 5000
): boolean {
    return text.length <= maxLength;
}
