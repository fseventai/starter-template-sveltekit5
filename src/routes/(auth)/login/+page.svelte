<script lang="ts">
    import { signIn } from "$lib/auth-client";
    import { goto } from "$app/navigation";
    import toast from "svelte-french-toast";
    import { Loader2 } from "@lucide/svelte";

    let email = $state("");
    let password = $state("");
    let loading = $state(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        loading = true;

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error.message ?? "Failed to sign in");
            } else {
                toast.success("Signed in successfully!");
                goto("/dashboard");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Sign In | SvelteKit Starter</title>
</svelte:head>

<main class="min-h-screen flex items-center justify-center p-8">
    <div class="w-full max-w-md space-y-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold">Welcome back</h1>
            <p class="text-(--color-muted-foreground)">
                Sign in to your account
            </p>
        </div>

        <form onsubmit={handleSubmit} class="card space-y-4">
            <div class="space-y-2">
                <label for="email" class="text-sm font-medium">Email</label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    required
                    class="input"
                    placeholder="name@example.com"
                />
            </div>

            <div class="space-y-2">
                <label for="password" class="text-sm font-medium"
                    >Password</label
                >
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    required
                    minlength="8"
                    class="input"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                class="btn btn-primary w-full flex items-center justify-center gap-2"
            >
                {#if loading}
                    <Loader2 class="size-4 animate-spin" />
                    Signing in...
                {:else}
                    Sign In
                {/if}
            </button>
        </form>

        <p class="text-center text-sm text-(--color-muted-foreground)">
            Don't have an account?
            <a href="/register" class="text-(--color-primary) hover:underline">
                Register
            </a>
        </p>
    </div>
</main>
