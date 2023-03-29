<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { Page404 } from 'flowbite-svelte-blocks';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.message ? '404 Not Found' : 'Redirecting...'}</title>
</svelte:head>

<main>
	{#if data.message}
		<Page404>
			<svelte:fragment slot="h1">404</svelte:fragment>
			<svelte:fragment slot="paragraph">
				<p
					class="mb-4 text-xl font-bold tracking-tight text-gray-900 md:text-2xl md:text-4xl dark:text-white">
					Something's missing.
				</p>
				<p class="mb-4 text-sm font-light text-gray-500 md:text-base dark:text-gray-400">
					Sorry, we can't find that page.
				</p>
				<Button href="/" size="sm" color="blue">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="mr-1 w-5 h-5">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
					</svg>
					Back to Homepage</Button>
			</svelte:fragment>
		</Page404>
	{:else}
		<h2>Redirecting</h2>
	{/if}
</main>
