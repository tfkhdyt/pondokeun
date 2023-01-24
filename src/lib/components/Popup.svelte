<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { Link } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;
	export let link: Link | null = null;

	const dispatch = createEventDispatcher();

	function toggle() {
		dispatch('deleteModalClosed');
	}

	function handleDelete() {
		console.log(`/${link?.slug} is deleted!`);
    toggle();
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="modal-overlay" transition:fade={{ easing: cubicInOut }} on:click|self={toggle}>
		<div class="rounded-lg bg-white p-8 shadow-2xl modal-content">
			<h2 class="text-lg font-bold">Are you sure you want to delete /{link?.slug}?</h2>

			<p class="mt-2 text-sm text-gray-500">
				Deleted link cannot be recovered, are you 100% sure it's OK?
			</p>

			<div class="mt-8 flex items-center justify-end text-xs">
				<button
					type="button"
					class="rounded bg-green-50 px-4 py-2 font-medium text-green-600"
					on:click={handleDelete}
				>
					Yes, I'm sure
				</button>
				<button
					type="button"
					class="ml-2 rounded bg-gray-50 px-4 py-2 font-medium text-gray-600"
					on:click={toggle}
				>
					No, go back
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.25);
		z-index: 1;
	}

	.modal-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 1rem;
		border-radius: 0.5rem;
		z-index: 2;
	}
</style>
