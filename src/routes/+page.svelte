<script lang="ts">
	import CTA from '$lib/components/CTA.svelte';
	import SingleResult from '$lib/components/SingleResult.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const { form: formS, errors, constraints, enhance } = superForm(data.form);
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<CTA />
<form method="POST" use:enhance>
	<label for="link" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
		>Paste a link to shorten it</label
	>
	<div class="relative">
		<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
				/>
			</svg>
		</div>
		<input
			type="url"
			id="link"
			class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Paste a link to shorten it"
			required
			name="link"
			bind:value={$formS.link}
			{...$constraints.link}
		/>
		<button
			type="submit"
			class="absolute right-2.5 bottom-2.5 py-2 px-4 text-sm font-medium text-white bg-blue-700 rounded-lg dark:bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Shorten</button
		>
	</div>

	{#if $errors.link}
		<p class="mt-2 text-sm text-red-600 dark:text-red-500">
			{$errors.link}
		</p>
	{/if}
</form>

{#if form?.success === true}
	<SingleResult slug={form.addedLink.slug} link={form.addedLink.link} />
{/if}
<SingleResult slug={'bruh'} link={'bruh'} />
