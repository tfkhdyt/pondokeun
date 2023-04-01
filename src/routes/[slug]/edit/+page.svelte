<script lang="ts">
	import { TRPCClientError } from '@trpc/client';
	import { Breadcrumb, BreadcrumbItem, Button, Heading, Input, Label, P } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';

	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	import type { PageData } from './$types';

	export let data: PageData;

	let { slug } = $page.params;
	let linkMemo = data.link?.link;
	let createdAtMemo = data.link?.createdAt as Date;
	let updatedAtMemo = data.link?.updatedAt as Date;

	let customName = slug;

	const handleUpdateLink = async () => {
		try {
			await trpc($page).updateLink.mutate({ oldSlug: slug, customName });
			await invalidate('links');

			toast.success(`/${slug} has been updated to /${customName}`, {
				position: 'top-right',
			});
			await goto('/');
		} catch (error) {
			if (error instanceof TRPCClientError) {
				toast.error(error.message, { position: 'top-right' });
			}
		}
	};
</script>

<svelte:head>
	<title>{slug} | Pondokeun</title>
</svelte:head>

<main class="space-y-2">
	<Breadcrumb aria-label="Update page Breadcrumb" class="mb-4">
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/{slug}" target="_blank">{slug}</BreadcrumbItem>
		<BreadcrumbItem href="/{slug}/edit">Edit</BreadcrumbItem>
	</Breadcrumb>
	<Heading tag="h2">Edit <span class="text-[#1a56db]">/{slug}</span></Heading>
	<form class="pt-4 space-y-4" method="POST" on:submit|preventDefault={handleUpdateLink}>
		<div>
			<Label defaultClass="mb-2 text-base font-medium block">Link</Label>
			<Input type="url" size="md" disabled readonly value={linkMemo} />
		</div>
		<div>
			<Label for="slug" defaultClass="mb-2 text-base font-medium block">Slug</Label>
			<Input
				type="text"
				name="customName"
				placeholder="Your custom slug (Alphanumeric, hyphen, and underscore only)"
				id="slug"
				size="md"
				bind:value={customName}
				pattern="[a-zA-Z0-9_-]*" />
		</div>

		<div class="space-y-4">
			<div>
				<Label defaultClass="mb-0 text-base font-medium block">Created at</Label>
				<P
					>{createdAtMemo.toLocaleString('en-GB', {
						dateStyle: 'full',
						timeStyle: 'medium',
					})}</P>
			</div>
			<div>
				<Label defaultClass="mb-0 text-base font-medium block">Updated at</Label>
				<P
					>{updatedAtMemo.toLocaleString('en-GB', {
						dateStyle: 'full',
						timeStyle: 'medium',
					})}</P>
			</div>
		</div>

		<Button type="submit">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="mr-2 w-5 h-5">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
			</svg>
			Submit
		</Button>
	</form>
</main>
