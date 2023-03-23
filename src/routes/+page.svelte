<script lang="ts">
	import CTA from '$lib/components/CTA.svelte';
	import SingleResult from '$lib/components/SingleResult.svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
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
<form method="POST" use:enhance class="mt-8">
	<label for="link" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
		>Paste a link to shorten it</label
	>

	<Input
		id="link"
		placeholder="Paste a link to shorten it"
		size="lg"
		name="link"
		bind:value={$formS.link}
		{...$constraints.link}
	>
		<svg
			slot="left"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 text-gray-500 dark:text-gray-400"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
			/>
		</svg>
		<Button slot="right" size="md" type="submit">Search</Button>
	</Input>
</form>

{#if form?.success === true}
	<SingleResult slug={form.addedLink.slug} link={form.addedLink.link} />
{/if}
