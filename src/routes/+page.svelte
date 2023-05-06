<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { TRPCClientError } from '@trpc/client';
	import { Button, ButtonGroup, FloatingLabelInput, Input, Select, Toggle } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { LinkWithVisitorsNumber } from '$entities/link.entity';
	import CTA from '$lib/components/CTA.svelte';
	import SingleResult from '$lib/components/SingleResult.svelte';
	import { trpc } from '$lib/trpc/client';

	import type { PageData } from './$types';

	export let data: PageData;

	let isUseCustomSlug = false;
	let sortCategory = 'updatedDate-desc';
	let sortCategories = [
		{ value: 'updatedDate-desc', name: 'Updated date (descending)' },
		{ value: 'updatedDate-asc', name: 'Updated date (ascending)' },
		{ value: 'createdDate-desc', name: 'Created date (descending)' },
		{ value: 'createdDate-asc', name: 'Created date (ascending)' },
		{ value: 'slug-desc', name: 'Slug (descending)' },
		{ value: 'slug-asc', name: 'Slug (ascending)' },
	];
	let searchQuery = '';
	$: filteredData = data?.links
		?.filter(
			(each) =>
				each.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
				each.link.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			if (sortCategory === sortCategories[1].value) {
				return a.updatedAt.getTime() - b.updatedAt.getTime();
			} else if (sortCategory === sortCategories[2].value) {
				return b.createdAt.getTime() - a.createdAt.getTime();
			} else if (sortCategory === sortCategories[3].value) {
				return a.createdAt.getTime() - b.createdAt.getTime();
			} else if (sortCategory === sortCategories[4].value) {
				return b.slug.localeCompare(a.slug);
			} else if (sortCategory === sortCategories[5].value) {
				return a.slug.localeCompare(b.slug);
			} else {
				return b.updatedAt.getTime() - a.updatedAt.getTime();
			}
		}) as LinkWithVisitorsNumber[];

	let link: string;
	let customName: string;
	let addedLink: LinkWithVisitorsNumber;

	const handleCreateLink = async () => {
		try {
			addedLink = await trpc($page).createLink.mutate({ link, customName });
			await invalidate('links');
			link = '';
			customName = '';
		} catch (error) {
			if (error instanceof TRPCClientError) {
				if (Array.isArray(error.message)) {
					const errors = JSON.parse(error.message) as { message: string }[];
					for (const err of errors) {
						return toast.error(err.message, { position: 'top-right' });
					}
				}
				toast.error(error.message, { position: 'top-right' });
			}
		}
	};

	$: if (addedLink) {
		toast.success(`/${addedLink.slug} has been created successfully`, {
			position: 'top-right',
		});
	}
</script>

<svelte:head>
	<title>Pondokeun</title>
</svelte:head>

<main>
	<CTA />
	<form method="post" class="mt-8" use:autoAnimate on:submit|preventDefault={handleCreateLink}>
		<div>
			<ButtonGroup class="w-full">
				<Input
					id="link"
					type="url"
					name="link"
					bind:value={link}
					placeholder="Paste a link to shorten it" />
				<Button color="blue" type="submit">Shorten</Button>
			</ButtonGroup>
		</div>

		{#if $page.data.session?.user}
			<Toggle class="my-4" bind:checked={isUseCustomSlug}>Use custom slug</Toggle>
			{#if isUseCustomSlug}
				<Input
					type="text"
					placeholder="Your custom slug (Alphanumeric, hyphen, and underscore only)"
					size="md"
					name="customName"
					bind:value={customName}
					pattern="[a-zA-Z0-9_-]*" />
			{/if}
		{/if}
	</form>

	<div class="mt-6 space-y-2" use:autoAnimate>
		{#if addedLink && !$page.data.session}
			<SingleResult
				slug={addedLink.slug}
				link={addedLink.link}
				visitorsNumber={addedLink.visitorsNumber?.value ?? 0}
				createdDate={addedLink.createdAt}
				updatedDate={addedLink.updatedAt} />
		{:else if $page.data.session && data.links && data.links.length > 0}
			<div class="flex flex-col gap-2 items-center md:flex-row">
				<div class="w-full md:w-auto grow">
					<FloatingLabelInput
						id="search"
						name="search"
						type="text"
						label="Search link"
						bind:value={searchQuery} />
				</div>
				<div class="w-full md:w-2/6">
					<Select
						id="category"
						underline
						items={sortCategories}
						bind:value={sortCategory}
						placeholder="Sort by ..."
						underlineClass="text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
				</div>
			</div>
			{#if filteredData.length > 0}
				{#each filteredData as link (link.id)}
					<SingleResult
						slug={link.slug}
						link={link.link}
						visitorsNumber={link.visitorsNumber?.value ?? 0}
						createdDate={link.createdAt}
						updatedDate={link.updatedAt} />
				{/each}
			{/if}
		{/if}
	</div>
</main>
