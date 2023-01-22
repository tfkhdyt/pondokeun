<script lang="ts">
	import { fade } from 'svelte/transition';

	export let color: string;
	export let title: string;
</script>

<div
	role="alert"
	class="mt-4 rounded border-l-4 border-{color}-500 bg-{color}-50 dark:border-{color}-700 dark:bg-{color}-900 p-4"
	transition:fade
>
	<strong class="block font-medium text-{color}-700 dark:text-white">{title}</strong>
  <slot />
</div>
