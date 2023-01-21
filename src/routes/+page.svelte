<script lang="ts">
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';
	import Card from '$lib/components/Card.svelte';
	import Header1 from '$lib/components/Headers/Header1.svelte';
  import type { ActionData } from './$types';
	import { fade } from 'svelte/transition';
	import InputField from '$lib/components/InputField.svelte';

	export let form: ActionData;
	let isCopied = false;

	const appUrl = env.PUBLIC_APP_URL;
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<!-- svelte-ignore a11y-no-redundant-roles -->

<Card>
	<Header1>Pondokeun</Header1>
	<form method="POST" use:enhance>
		<div class="flex space-x-2">
      <InputField placeholder='Enter the link here' name='link' type='url' />

			<button
				class="inline-block rounded bg-yellow-500 hover:bg-red-500 py-3 text-sm font-medium text-white transition duration-500 ease-in-out focus:outline-none focus:ring active:bg-yellow-700 w-2/6 active:ring-0"
			>
				Shorten
			</button>
		</div>
	</form>

	{#if form?.status === 'success'}
		<div
			role="alert"
			class="mt-4 rounded border-l-4 border-green-500 bg-green-50 dark:border-green-700 dark:bg-green-900 p-4"
			transition:fade
		>
			<strong class="block font-medium text-green-700 dark:text-white"
				>Here's your shortened link!</strong
			>

			<p class="mt-2 text-sm text-green-700 dark:text-white">
				<a
					href="{appUrl}/{form?.addedLink?.slug}"
					class="underline"
					target="_blank"
					rel="noreferrer">{appUrl}/{form?.addedLink?.slug}</a
				>
				<button
					class="bg-gray-200 text-gray-800 px-2 py-1 ml-2 dark:bg-gray-800 dark:text-white rounded"
					on:click={() => {
						navigator.clipboard.writeText(`${appUrl}/${form?.addedLink?.slug}`);
						isCopied = true;
					}}>{isCopied ? 'Copied!' : 'Copy link'}</button
				>
			</p>
		</div>
	{:else if form?.status === 'error'}
		<div
			role="alert"
			class="mt-4 rounded border-l-4 border-red-500 bg-red-50 dark:border-red-700 dark:bg-red-900 p-4"
		>
			<strong class="block font-medium text-red-700 dark:text-white">Failed to shorten link!</strong
			>

			<p class="mt-2 text-sm text-red-700 dark:text-white">
				{form.message}
			</p>
		</div>
	{/if}
</Card>

<style>
</style>
