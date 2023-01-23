<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Alert from '$lib/components/Alert.svelte';
	import NormalButton from '$lib/components/Buttons/NormalButton.svelte';
	import Card from '$lib/components/Card.svelte';
	import Header1 from '$lib/components/Headers/Header1.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

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
		<Card customClass={!session ? 'w-[32rem]' : ''}>
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
					<NormalButton customClass="bg-white w-1/2 hover:bg-gray-200 text-dark"
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
			<Card customClass="lg:col-span-2">
				<Header1>My Links</Header1>
				<div>
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700">
							<thead>
								<tr>
									<th
										class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300"
									>
										Slug
									</th>
									<th
										class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300"
									>
										Original url
									</th>
									<th
										class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300"
									>
										Created date
									</th>
									<th
										class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300"
									>
										Updated date
									</th>
									<th
										class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300"
									>
										Actions
									</th>
								</tr>
							</thead>

							<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
								{#each data.links as link (link.id)}
									<tr>
										<td
											class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300"
										>
											<a
												href={`${appUrl}/${link.slug}`}
												class="underline"
												target="_blank"
												rel="noreferrer"
											>
												/{link.slug}
											</a>
										</td>
										<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
											{link.link}
										</td>
										<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
											{new Date(link.created_at).toLocaleString('id-ID')}
										</td>
										<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
											{new Date(link.updated_at).toLocaleString('id-ID')}
										</td>
										<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
											<Tooltip label="Copied">
												<NormalButton
													customClass="bg-blue-500 hover:bg-blue-600 text-white px-2"
													onClick={() => navigator.clipboard.writeText(`${appUrl}/${link.slug}`)}
													>Copy</NormalButton
												>
											</Tooltip>
											<NormalButton customClass="bg-yellow-500 hover:bg-yellow-600 text-white px-2"
												>Edit</NormalButton
											>
											<NormalButton customClass="bg-pink-500 hover:bg-pink-600 text-white px-2"
												>Delete</NormalButton
											>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</Card>
		{/if}
	</div>
</main>
