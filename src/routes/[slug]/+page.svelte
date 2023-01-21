<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.message ? '404 Not Found' : 'Redirecting...'}</title>
</svelte:head>

<main>
	{#if data.message}
		<h1>404</h1>
		<h2>{data.message}</h2>
  {:else}
    <h2>Redirecting</h2>
	{/if}
</main>
