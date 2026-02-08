<script lang="ts">
    import { signOut } from "$lib/auth-client";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<main class="min-h-screen flex flex-col items-center justify-center p-8">
    <div class="max-w-2xl w-full text-center space-y-8">
        <h1 class="text-4xl font-bold tracking-tight">
            SvelteKit 5 Starter Template
        </h1>

        <p class="text-lg text-[var(--color-muted-foreground)]">
            A modern starter with TailwindCSS v4, ElysiaJS, Better-Auth, Drizzle
            ORM & Supabase
        </p>

        <div class="card">
            {#if data.session?.user}
                <div class="space-y-4">
                    <p class="text-lg">
                        Welcome, <span class="font-semibold"
                            >{data.session.user.name}</span
                        >!
                    </p>
                    <p class="text-sm text-[var(--color-muted-foreground)]">
                        {data.session.user.email}
                    </p>
                    <div class="flex gap-4 justify-center">
                        <a href="/dashboard" class="btn btn-primary">
                            Go to Dashboard
                        </a>
                        <button
                            onclick={() => signOut()}
                            class="btn btn-outline"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            {:else}
                <div class="space-y-4">
                    <p class="text-[var(--color-muted-foreground)]">
                        You are not logged in
                    </p>
                    <div class="flex gap-4 justify-center">
                        <a href="/login" class="btn btn-primary"> Sign In </a>
                        <a href="/register" class="btn btn-outline">
                            Register
                        </a>
                    </div>
                </div>
            {/if}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div class="card">
                <h3 class="font-semibold mb-2">🚀 ElysiaJS API</h3>
                <p class="text-sm text-[var(--color-muted-foreground)]">
                    Type-safe API routes at <code
                        class="bg-[var(--color-muted)] px-1 rounded"
                        >/api/v1</code
                    >
                </p>
            </div>
            <div class="card">
                <h3 class="font-semibold mb-2">🔐 Better-Auth</h3>
                <p class="text-sm text-[var(--color-muted-foreground)]">
                    Full authentication with session management
                </p>
            </div>
            <div class="card">
                <h3 class="font-semibold mb-2">💾 Drizzle + Supabase</h3>
                <p class="text-sm text-[var(--color-muted-foreground)]">
                    Type-safe ORM with PostgreSQL migrations
                </p>
            </div>
        </div>
    </div>
</main>
