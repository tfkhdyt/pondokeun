<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Alert from '$lib/components/Alert.svelte';
	import NormalButton from '$lib/components/Buttons/NormalButton.svelte';
	import Card from '$lib/components/Card.svelte';
	import Header1 from '$lib/components/Headers/Header1.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import MyLinks from '$lib/components/MyLinks.svelte';
	import Profile from '$lib/components/Profile.svelte';

	import { signIn } from '@auth/sveltekit/client';
	import { clsx } from 'clsx';

	import type { ActionData, PageServerData } from './$types';

	export let form: ActionData;
	export let data: PageServerData;

	let isCopied = false;
	let useCustomName = false;

	$: session = $page.data.session;

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
	<div class="grid {session && 'grid-cols-1 lg:grid-cols-3'} lg:items-start">
		<Card customClass="lg:w-96">
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
					<InputField
						placeholder="Enter the link here"
						name="link"
						type="url"
						customClass="w-4/6"
					/>

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
					<label
						for="useCustomName"
						class={clsx(
							$page.data.session?.user || 'opacity-50 line-through',
							'dark:text-gray-300'
						)}
						title={!$page.data.session ? 'You should sign in first to use this feature' : undefined}
					>
						Custom slug
					</label>
				</div>

				{#if useCustomName === true}
					<InputField
						placeholder="Enter the custom slug (Alphanumeric, hyphen, underscore)"
						name="customName"
						type="text"
						customClass="mt-4 w-full"
						pattern="[a-zA-Z0-9-_]+"
					/>
				{/if}
			</form>

			{#if form?.status === 'success'}
				<Alert title="Here's your shortened link!" status="success">
					<p class="mt-2 text-sm text-green-700 dark:text-white space-y-2">
						<a
							href="{appUrl}/{form?.addedLink?.slug}"
							class="underline block"
							target="_blank"
							rel="noreferrer">{appUrl}/{form?.addedLink?.slug}</a
						>
						<button
							class="bg-gray-200 text-gray-800 px-2 py-1 dark:bg-gray-800 dark:text-white rounded"
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

			{#if $page.data.session?.user}
				<Hr label="Profile" />
				<Profile
					image={$page.data.session.user.image}
					name={$page.data.session.user.name}
					email={$page.data.session.user.email}
				/>
			{:else}
				<Hr label="Sign in for more features" />
				<div class="flex space-x-2">
					<NormalButton customClass="bg-white w-1/2 hover:bg-gray-400 text-dark"
						>Google</NormalButton
					>
					<NormalButton
						customClass="bg-gray-800 w-1/2 hover:bg-gray-600 text-white"
						onClick={() => signIn('github')}>GitHub</NormalButton
					>
				</div>
			{/if}
		</Card>
		{#if session}
			<MyLinks links={data.links} />
		{/if}
	</div>
</main>
