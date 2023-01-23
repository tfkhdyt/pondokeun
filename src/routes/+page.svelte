<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Alert from '$lib/components/Alert.svelte';
	import NormalButton from '$lib/components/Buttons/NormalButton.svelte';
	import Card from '$lib/components/Card.svelte';
	import Header1 from '$lib/components/Headers/Header1.svelte';
	import InputField from '$lib/components/InputField.svelte';

	import type { ActionData } from './$types';

	import { signIn, signOut } from '@auth/sveltekit/client';
  import { clsx } from 'clsx';

	export let form: ActionData;
	let isCopied = false;
	let useCustomName = false;

	const appUrl = $page.url.origin;

	async function copyText(text: string) {
		await navigator.clipboard.writeText(text);
		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 1500);
	}
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<!-- svelte-ignore a11y-no-redundant-roles -->

<main class="grid place-items-center min-h-screen">
	<Card>
		<Header1>Pondokeun</Header1>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ update }) => {
					await update({ reset: false });
				};
			}}
		>
			<div class="flex space-x-2 mb-4">
				<InputField placeholder="Enter the link here" name="link" type="url" customClass="w-4/6" />

				<NormalButton customClass="bg-yellow-500 hover:bg-red-500 active:bg-red-700 w-2/6"
					>Shorten</NormalButton
				>
			</div>
			<div class="flex items-center space-x-2">
				<input
					type="checkbox"
					id="useCustomName"
					name="useCustomName"
					class="rounded-md disabled:opacity-50"
					bind:checked={useCustomName}
          disabled={!$page.data.session?.user}
				/>
				<label for="useCustomName" class={clsx($page.data.session?.user || 'opacity-50 line-through')}> Custom name </label>
			</div>

			{#if useCustomName === true}
				<InputField
					placeholder="Enter the custom name (Alphanumeric, hyphen, underscore)"
					name="customName"
					type="text"
					customClass="mt-4 w-full"
					pattern="[a-zA-Z0-9-_]+"
				/>
			{/if}
		</form>

		{#if form?.status === 'success'}
			<Alert title="Here's your shortened link!" status="success">
				<p class="mt-2 text-sm text-green-700 dark:text-white">
					<a
						href="{appUrl}/{form?.addedLink?.slug}"
						class="underline"
						target="_blank"
						rel="noreferrer">{appUrl}/{form?.addedLink?.slug}</a
					>
					<button
						class="bg-gray-200 text-gray-800 px-2 py-1 ml-2 dark:bg-gray-800 dark:text-white rounded"
						on:click={() => copyText(`${appUrl}/${form?.addedLink?.slug}`)}
						>{isCopied ? 'Copied!' : 'Copy link'}</button
					>
				</p>
			</Alert>
		{:else if form?.status === 'error' || form?.status === 'fail'}
			<Alert status="error" title="Failed to shorten link!">
				<p class="mt-2 text-sm text-red-700 dark:text-white">
					{form.message}
				</p>
			</Alert>
		{/if}

		{#if $page.data.session}
			<hr class="my-4" />
			<article class="rounded-xl border-2 border-gray-100 bg-white">
				<div class="flex items-start p-6">
					<img
						alt="Speaker"
						src={$page.data.session.user?.image}
						class="h-14 w-14 rounded-lg object-cover"
					/>

					<div class="ml-4">
						<h3 class="font-medium sm:text-lg">
							Welcome, {$page.data.session.user?.name}
						</h3>

						<p class="text-sm text-gray-700">
							{$page.data.session.user?.email}
						</p>
					</div>
				</div>

				<div class="flex justify-end -mt-6">
					<button
						class="flex items-center rounded-tl-xl rounded-br-xl bg-red-600 hover:bg-red-800 py-1.5 px-3 text-white transition duration-500 ease-in-out"
            on:click={() => signOut()}
					>
						<p class="font-medium">Log out</p>
					</button>
				</div>
			</article>
		{:else}
			<hr class="my-4" />

			<p class="mb-2">Sign in for more features:</p>
			<div class="flex space-x-2">
				<NormalButton customClass="bg-white w-1/2 hover:bg-gray-200 text-dark">Google</NormalButton>
				<NormalButton
					customClass="bg-gray-800 w-1/2 hover:bg-gray-600 text-white"
					onClick={() => signIn('github')}>GitHub</NormalButton
				>
			</div>
		{/if}
	</Card>
</main>
