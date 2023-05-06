<script lang="ts">
	import { TRPCClientError } from '@trpc/client';
	import { Button, Modal } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	export let popupModal: boolean;
	export let slug: string;

	const deleteLink = async (slug: string) => {
		try {
			await trpc($page).deleteLink.mutate({ slug });
			await invalidate('links');
			toast.success(`/${slug} has been deleted successfully`, { position: 'top-right' });
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
</script>

<div>
	<Modal bind:open={popupModal} size="xs" autoclose>
		<div class="text-center">
			<svg
				aria-hidden="true"
				class="mx-auto mb-4 w-14 h-14 text-gray-500 dark:text-gray-200"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<h3 class="mb-5 text-lg font-normal text-gray-800 dark:text-gray-400">
				Are you sure you want to delete this link (/{slug})?
			</h3>
			<Button color="red" class="mr-2" on:click={() => deleteLink(slug)}>Yes, I'm sure</Button>
			<Button color="alternative">No, cancel</Button>
		</div>
	</Modal>
</div>
