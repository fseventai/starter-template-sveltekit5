<script lang="ts">
    import { signUp } from "$lib/auth-client";
    import { goto } from "$app/navigation";
    import toast from "svelte-french-toast";
    import { Loader2 } from "@lucide/svelte";

    let name = $state("");
    let email = $state("");
    let password = $state("");
    let loading = $state(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        loading = true;

        try {
            const result = await signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error.message ?? "Failed to register");
            } else {
                toast.success("Account created successfully!");
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
    <title>Register | SvelteKit Starter</title>
</svelte:head>

<main class="min-h-screen flex items-center justify-center p-8">
    <div class="w-full max-w-md space-y-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold">Create an account</h1>
            <p class="text-(--color-muted-foreground)">
                Enter your details to get started
            </p>
        </div>

        <form onsubmit={handleSubmit} class="card space-y-4">
            <div class="space-y-2">
                <label for="name" class="text-sm font-medium">Name</label>
                <input
                    id="name"
                    type="text"
                    bind:value={name}
                    required
                    class="input"
                    placeholder="John Doe"
                />
            </div>

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
                <p class="text-xs text-(--color-muted-foreground)">
                    Must be at least 8 characters
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                class="btn btn-primary w-full flex items-center justify-center gap-2"
            >
                {#if loading}
                    <Loader2 class="size-4 animate-spin" />
                    Creating account...
                {:else}
                    Create Account
                {/if}
            </button>
        </form>

        <p class="text-center text-sm text-(--color-muted-foreground)">
            Already have an account?
            <a href="/login" class="text-(--color-primary) hover:underline">
                Sign in
            </a>
        </p>
    </div>
</main>
