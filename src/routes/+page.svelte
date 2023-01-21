<script lang="ts">
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let isCopied = false;

	const appUrl = env.PUBLIC_APP_URL;
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<!-- svelte-ignore a11y-no-redundant-roles -->

<div
	class="rounded-2xl bg-gradient-to-br from-yellow-400 to-red-600 p-1 shadow-xl w-[32rem] dark:shadow-gray-700/50 dark:from-yellow-600 dark:to-red-800"
>
	<div class="block rounded-xl bg-white dark:bg-gray-800 p-6 sm:p-8">
		<h1
			class="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-red-600 mb-8 dark:from-yellow-600 dark:to-red-800"
		>
			Pondokeun
		</h1>
		<form method="POST" use:enhance>
			<div class="flex space-x-2">
				<input
					type="url"
					name="link"
					placeholder="Enter the link here"
					required
					class="p-4 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm focus:border-yellow-600 focus:ring-yellow-600 w-4/6 dark:text-gray-300 transition duration-500 ease-in-out"
				/>

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
				<strong class="block font-medium text-red-700 dark:text-white"
					>Failed to shorten link!</strong
				>

				<p class="mt-2 text-sm text-red-700 dark:text-white">
					{form.message}
				</p>
			</div>
		{/if}
	</div>
</div>
<main />

<style>
</style>
