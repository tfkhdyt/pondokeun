<script lang="ts">
	import CTA from '$lib/components/CTA.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let actions: ActionData;

	const { form, errors, constraints, enhance } = superForm(data.form);
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
			bind:value={$form.link}
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

{#if actions?.success === true && actions?.addedLink}
	<div
		class="flex justify-between items-center p-4 mt-4 mb-4 text-sm text-blue-800 bg-blue-50 rounded-lg dark:text-blue-400 dark:bg-gray-800"
		role="alert"
	>
		<span class="sr-only">Info</span>
		<div>
			<span class="font-medium">{actions.addedLink.link}</span>
		</div>
		<div class="flex items-center space-x-2">
			<span class="font-bold">/{actions.addedLink.slug}</span>

			<button
				type="button"
				class="flex py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				data-tooltip-target="tooltip-click"
				data-tooltip-trigger="click"
				on:click={async () => await navigator.clipboard.writeText('bruh')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-1 w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
					/>
				</svg>
				Copy</button
			>
			<div
				id="tooltip-click"
				role="tooltip"
				class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 dark:bg-gray-700 tooltip"
			>
				Copied
				<div class="tooltip-arrow" data-popper-arrow />
			</div>
			<button
				type="button"
				class="flex py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-1 w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
				Edit</button
			>

			<button
				type="button"
				class="flex py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-full dark:bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-200 focus:outline-none dark:hover:bg-red-600 dark:focus:ring-red-800"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-1 w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
				Delete</button
			>
		</div>
	</div>
{/if}
