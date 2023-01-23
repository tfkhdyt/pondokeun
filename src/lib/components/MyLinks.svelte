<script lang="ts">
	import { page } from '$app/stores';

	import NormalButton from './Buttons/NormalButton.svelte';
	import Card from './Card.svelte';
	import Header1 from './Headers/Header1.svelte';
	import Tooltip from './Tooltip.svelte';

	import type { Link } from '@prisma/client';

	export let links: Link[];

	const appUrl = $page.url.origin;
</script>

<Card customClass="lg:col-span-2">
	<Header1>My Links</Header1>
	<div>
		{#if links.length > 0}
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
						{#each links as link (link.id)}
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
		{:else}
			<p class="text-center dark:text-gray-300">It looks like you haven't shortened any link</p>
		{/if}
	</div>
</Card>
