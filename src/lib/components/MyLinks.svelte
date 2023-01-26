<script lang="ts">
	import { page } from '$app/stores';

	import NormalButton from './Buttons/NormalButton.svelte';
	import Card from './Card.svelte';
	import Header1 from './Headers/Header1.svelte';
	import Tooltip from './Tooltip.svelte';

	import type { Link } from '@prisma/client';
	import Popup from './Popup.svelte';
	import { goto } from '$app/navigation';

	export let links: Link[];
	let isOpen = false;
	let deletedLink: Link | null = null;

	const appUrl = $page.url.origin;

	function handleDeleteClick(link: Link) {
		(isOpen = true), (deletedLink = link);
	}
</script>

<!-- <div class="card card-hover variant-ringed-warning p-4 w-full lg:w-auto sm:flex-none lg:grow"> -->
<div class="card card-hover variant-ringed-warning p-4 flex-1 w-full lg:w-auto lg:basis-4/6">
	<header class="card-header">
		<Header1>My Links</Header1>
	</header>

	<div class="p-4">
		{#if links.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each links as link (link.id)}
					<div class="card variant-ringed-primary hover:variant-ghost-primary p-4 transition">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h5 class="font-medium cursor-pointer" on:click={() => goto(`${appUrl}/${link.slug}`)}>/{link.slug}</h5>
            <a href={link.link} target="_blank" rel="noreferrer">{link.link}</a>
            <p class="mt-4 font-light">{new Date(link.updated_at).toLocaleString('id-ID')}</p>
          </div>
				{/each}
			</div>
		{:else}
			<p class="text-center dark:text-gray-300 p-4">It looks like you haven't shortened any link</p>
		{/if}
	</div>
	<!-- <div> -->
	<!-- 	{#if links.length > 0} -->
	<!-- 		<div class="overflow-x-auto"> -->
	<!-- 			<table class="min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700"> -->
	<!-- 				<thead> -->
	<!-- 					<tr> -->
	<!-- 						<th -->
	<!-- 							class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300" -->
	<!-- 						> -->
	<!-- 							Slug -->
	<!-- 						</th> -->
	<!-- 						<th -->
	<!-- 							class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300" -->
	<!-- 						> -->
	<!-- 							Original url -->
	<!-- 						</th> -->
	<!-- 						<th -->
	<!-- 							class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300" -->
	<!-- 						> -->
	<!-- 							Created date -->
	<!-- 						</th> -->
	<!-- 						<th -->
	<!-- 							class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300" -->
	<!-- 						> -->
	<!-- 							Updated date -->
	<!-- 						</th> -->
	<!-- 						<th -->
	<!-- 							class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-300" -->
	<!-- 						> -->
	<!-- 							Actions -->
	<!-- 						</th> -->
	<!-- 					</tr> -->
	<!-- 				</thead> -->

	<!-- 				<tbody class="divide-y divide-gray-200 dark:divide-gray-700"> -->
	<!-- 					{#each links as link (link.id)} -->
	<!-- 						<tr> -->
	<!-- 							<td -->
	<!-- 								class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300" -->
	<!-- 							> -->
	<!-- 								<a -->
	<!-- 									href={`${appUrl}/${link.slug}`} -->
	<!-- 									class="underline" -->
	<!-- 									target="_blank" -->
	<!-- 									rel="noreferrer" -->
	<!-- 								> -->
	<!-- 									/{link.slug} -->
	<!-- 								</a> -->
	<!-- 							</td> -->
	<!-- 							<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"> -->
	<!-- 								{link.link} -->
	<!-- 							</td> -->
	<!-- 							<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"> -->
	<!-- 								{new Date(link.created_at).toLocaleString('id-ID')} -->
	<!-- 							</td> -->
	<!-- 							<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"> -->
	<!-- 								{new Date(link.updated_at).toLocaleString('id-ID')} -->
	<!-- 							</td> -->
	<!-- 							<td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"> -->
	<!-- 								<Tooltip label="Copied"> -->
	<!-- 									<NormalButton -->
	<!-- 										customClass="bg-blue-500 hover:bg-blue-600 text-white px-2" -->
	<!-- 										onClick={() => navigator.clipboard.writeText(`${appUrl}/${link.slug}`)} -->
	<!-- 										>Copy</NormalButton -->
	<!-- 									> -->
	<!-- 								</Tooltip> -->
	<!-- 								<NormalButton customClass="bg-yellow-500 hover:bg-yellow-600 text-white px-2" -->
	<!-- 									>Edit</NormalButton -->
	<!-- 								> -->
	<!-- 								<NormalButton -->
	<!-- 									customClass="bg-pink-500 hover:bg-pink-600 text-white px-2" -->
	<!-- 									onClick={() => handleDeleteClick(link)}>Delete</NormalButton -->
	<!-- 								> -->
	<!-- 							</td> -->
	<!-- 						</tr> -->
	<!-- 					{/each} -->
	<!-- 				</tbody> -->
	<!-- 			</table> -->
	<!-- 		</div> -->
	<!-- 	{:else} -->
	<!-- 		<p class="text-center dark:text-gray-300 p-4">It looks like you haven't shortened any link</p> -->
	<!-- 	{/if} -->
	<!-- </div> -->
</div>
<!-- <Popup -->
<!-- 	{isOpen} -->
<!-- 	link={deletedLink} -->
<!-- 	on:deleteModalClosed={() => { -->
<!-- 		isOpen = false; -->
<!-- 		deletedLink = null; -->
<!-- 	}} -->
<!-- /> -->
