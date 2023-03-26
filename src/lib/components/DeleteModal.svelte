<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';

	import { deleteLink } from '$lib/utils';

	export let popupModal: boolean;
	export let slug: string;
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
