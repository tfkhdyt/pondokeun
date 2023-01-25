<script lang="ts">
	export let label: string | null = null;
</script>

<div class="relative flex py-5 items-center">
	<div class="flex-grow border-t border-gray-400 dark:border-gray-600" />
	{#if label}
		<span class="flex-shrink mx-4 text-gray-400">{label}</span>
	{/if}
	<div class="flex-grow border-t border-gray-400 dark:border-gray-600" />
</div>
