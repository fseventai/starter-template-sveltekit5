<script lang="ts">
    import { signOut } from "$lib/auth-client";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    async function handleSignOut() {
        await signOut();
        goto("/");
    }
</script>

<svelte:head>
    <title>Dashboard | SvelteKit Starter</title>
</svelte:head>

<div class="min-h-screen">
    <!-- Header -->
    <header class="border-b border-[var(--color-border)]">
        <div
            class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
        >
            <a href="/" class="text-xl font-bold">SvelteKit Starter</a>
            <div class="flex items-center gap-4">
                <span class="text-sm text-[var(--color-muted-foreground)]">
                    {data.session?.user?.email}
                </span>
                <button onclick={handleSignOut} class="btn btn-outline text-sm">
                    Sign Out
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto p-8">
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl font-bold">Dashboard</h1>
                <p class="text-[var(--color-muted-foreground)]">
                    Welcome back, {data.session?.user?.name}!
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Stats Cards -->
                <div class="card">
                    <h3
                        class="text-sm font-medium text-[var(--color-muted-foreground)]"
                    >
                        Session Info
                    </h3>
                    <p class="text-2xl font-bold mt-2">Active</p>
                    <p
                        class="text-xs text-[var(--color-muted-foreground)] mt-1"
                    >
                        Session ID: {data.session?.session.id.slice(0, 8)}...
                    </p>
                </div>

                <div class="card">
                    <h3
                        class="text-sm font-medium text-[var(--color-muted-foreground)]"
                    >
                        API Status
                    </h3>
                    <p class="text-2xl font-bold mt-2">Ready</p>
                    <p
                        class="text-xs text-[var(--color-muted-foreground)] mt-1"
                    >
                        ElysiaJS at /api/v1
                    </p>
                </div>

                <div class="card">
                    <h3
                        class="text-sm font-medium text-[var(--color-muted-foreground)]"
                    >
                        Database
                    </h3>
                    <p class="text-2xl font-bold mt-2">Supabase</p>
                    <p
                        class="text-xs text-[var(--color-muted-foreground)] mt-1"
                    >
                        Drizzle ORM connected
                    </p>
                </div>
            </div>

            <!-- User Info -->
            <div class="card">
                <h2 class="text-lg font-semibold mb-4">Your Profile</h2>
                <div class="space-y-2 text-sm">
                    <div
                        class="flex justify-between py-2 border-b border-[var(--color-border)]"
                    >
                        <span class="text-[var(--color-muted-foreground)]"
                            >Name</span
                        >
                        <span class="font-medium"
                            >{data.session?.user?.name}</span
                        >
                    </div>
                    <div
                        class="flex justify-between py-2 border-b border-[var(--color-border)]"
                    >
                        <span class="text-[var(--color-muted-foreground)]"
                            >Email</span
                        >
                        <span class="font-medium"
                            >{data.session?.user?.email}</span
                        >
                    </div>
                    <div
                        class="flex justify-between py-2 border-b border-[var(--color-border)]"
                    >
                        <span class="text-[var(--color-muted-foreground)]"
                            >Email Verified</span
                        >
                        <span class="font-medium">
                            {data.session?.user?.emailVerified ? "Yes" : "No"}
                        </span>
                    </div>
                    <div class="flex justify-between py-2">
                        <span class="text-[var(--color-muted-foreground)]"
                            >User ID</span
                        >
                        <span class="font-mono text-xs"
                            >{data.session?.user?.id}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
