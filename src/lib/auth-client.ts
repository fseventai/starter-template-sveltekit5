import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
    // baseURL is optional when using same domain
});

// Export commonly used functions for convenience
export const {
    signIn,
    signUp,
    signOut,
    useSession
} = authClient;
