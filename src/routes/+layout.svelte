<script lang="ts">
  import "../app.css";
  import { Toaster } from "svelte-french-toast";

  let { children } = $props();
</script>

<Toaster />

<svelte:head>
  <title>SvelteKit 5 Starter</title>
</svelte:head>

{@render children()}
