<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import NormalButton from '$lib/components/Buttons/NormalButton.svelte';
	import Header1 from '$lib/components/Headers/Header1.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import MyLinks from '$lib/components/MyLinks.svelte';
	import Profile from '$lib/components/Profile.svelte';

	import { signIn } from '@auth/sveltekit/client';
	import { clsx } from 'clsx';
	import { fade } from 'svelte/transition';

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

<main class="grid">
	<div class="flex flex-col lg:flex-row p-4 lg:p-64 gap-4 lg:gap-8 lg:w-screen justify-center md:justify-stretch items-start">
		<div class="card card-hover variant-ringed-warning p-4 flex-1 w-full lg:basis-2/6">
			<header class="card-header">
				<Header1>Pondokeun</Header1>
			</header>
			<div class="p-4">
				<form
					method="POST"
					use:enhance={() => {
						return async ({ update }) => {
							await update({ reset: false });
						};
					}}
				>
					<div class="flex space-x-2 mb-4">
						<input
							type="url"
							name="link"
							placeholder="Enter the link here"
							required
							class="basis-4/6"
						/>
						<button class="btn variant-filled-warning btn-base basis-2/6"> Shorten! </button>
					</div>
					<div class="flex items-center space-x-2">
						<input
							type="checkbox"
							id="useCustomName"
							name="useCustomName"
							class="disabled:opacity-50"
							bind:checked={useCustomName}
							disabled={!$page.data.session?.user}
						/>
						<label
							for="useCustomName"
							class={clsx(
								$page.data.session?.user || 'opacity-50 line-through',
								'dark:text-gray-300'
							)}
							title={!$page.data.session
								? 'You should sign in first to use this feature'
								: undefined}
						>
							Custom slug
						</label>
					</div>

					{#if useCustomName === true}
						<InputField
							placeholder="Enter the custom slug (Alphanumeric, hyphen, underscore)"
							name="customName"
							type="text"
							customClass="mt-4"
							pattern="[a-zA-Z0-9-_]+"
						/>
					{/if}
				</form>

				{#if form?.status === 'success'}
					<aside class="alert variant-ghost-success mt-6" transition:fade|local={{ duration: 200 }}>
						<div class="alert-message">
							<h4 class="font-semibold">Here's your shortened link!</h4>
							<a
								href="{appUrl}/{form?.addedLink?.slug}"
								class="underline block"
								target="_blank"
								rel="noreferrer">{appUrl}/{form?.addedLink?.slug}</a
							>
							<button
								class="btn variant-filled-success btn-base"
								on:click={() => copyText(`${appUrl}/${form?.addedLink?.slug}`)}
								>{isCopied ? 'Copied!' : 'Copy link'}</button
							>
						</div>
					</aside>
				{:else if form?.status === 'error' || form?.status === 'fail'}
					<aside class="alert variant-ghost-error mt-6" transition:fade|local={{ duration: 200 }}>
						<div class="alert-message">
							<h4 class="font-semibold">Failed to shorten link!</h4>
							<p>{form.message}</p>
						</div>
					</aside>
				{/if}

				{#if session?.user?.image}
					<Hr label="Profile" />
					<Profile image={session.user.image} name={session.user.name} email={session.user.email} />
				{:else}
					<Hr label="Sign in for more features" />
					<div class="flex space-x-2">
						<button class="btn variant-filled-secondary btn-base basis-1/2"> Google </button>
						<button class="btn variant-ghost-surface btn-base basis-1/2" on:click={() => signIn('github')}> GitHub </button>
					</div>
				{/if}
			</div>
		</div>
		{#if session}
			<MyLinks links={data.links} />
		{/if}
	</div>
</main>
