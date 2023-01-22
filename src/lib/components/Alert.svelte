<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clsx } from 'clsx';

	export let status: 'success' | 'error';
	export let title: string;
</script>

<div
	role="alert"
	class={clsx(
		'mt-4 rounded border-l-4 p-4',
		status === 'success'
			? 'border-green-500 bg-green-50 dark:border-green-700 dark:bg-green-900'
			: 'border-red-500 bg-red-50 dark:border-red-700 dark:bg-red-900'
	)}
	transition:fade
>
	<strong
		class={clsx(
			'block font-medium dark:text-white',
			status === 'success' ? 'text-green-700' : 'text-red-700'
		)}>{title}</strong
	>
  <slot />
</div>
